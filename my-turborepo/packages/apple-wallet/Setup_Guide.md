# Apple Wallet Pass Setup & Signing

This document describes how to manually create, sign, package, and test an Apple Wallet `.pkpass` file.

The process was tested on macOS using:

* Apple Developer Account
* Apple Pass Type ID
* Keychain Access
* OpenSSL
* Python 3
* iPhone + Apple Wallet

---

## 1. Overview

An Apple Wallet pass is ultimately a `.pkpass` file.

The basic process is:

```text
Apple Developer Account
        ↓
Pass Type ID
        ↓
Pass Type ID Certificate
        ↓
CSR + Private Key
        ↓
Certificate + Private Key + WWDR Certificate
        ↓
pass.json + images
        ↓
manifest.json
        ↓
signature
        ↓
.pkpass
        ↓
iPhone
        ↓
Apple Wallet
```

Apple requires Wallet passes to be signed with an Apple-issued certificate associated with the developer account.

---

# 2. Create a Pass Type ID

Go to the Apple Developer account:

https://developer.apple.com/account/

Navigate to:

```text
Certificates, Identifiers & Profiles
    → Identifiers
    → +
    → Pass Type IDs
```

Create a Pass Type ID.

Example:

```text
pass.com.example.event
```

The Pass Type ID is used in `pass.json`:

```json
{
  "passTypeIdentifier": "pass.com.example.event"
}
```

The `passTypeIdentifier` in `pass.json` must match the Pass Type ID associated with the certificate used to sign the pass.

---

# 3. Create the Pass Type ID Certificate

In the Apple Developer portal:

```text
Certificates, Identifiers & Profiles
    → Certificates
    → +
    → Pass Type ID Certificate
```

Follow Apple's instructions to create a Certificate Signing Request (CSR).

On macOS, this can be done through:

```text
Keychain Access
    → Certificate Assistant
    → Request a Certificate From a Certificate Authority
```

When the CSR is created, macOS generates the corresponding private key.

### Important

The private key is critical.

Apple provides the certificate, but the private key is generated/stored on your Mac.

In Keychain Access, the key may appear as:

```text
Wallet Pass Signing Key
```

or another name chosen/generated during the CSR process.

It should be a **private key**, not merely the public key.

---

# 4. Export the Private Key

In:

```text
Keychain Access
    → login
    → My Certificates
```

Find the Wallet Pass signing key.

Right-click the private key:

```text
Export
```

Export it as:

```text
.p12
```

For example:

```text
wallet-pass-key.p12
```

Set an export password when macOS asks for one.

### Security

Never commit this file to Git.

Do not put it in:

```text
public/
```

Do not expose it to the browser.

Do not use a `NEXT_PUBLIC_*` environment variable for the private key.

---

# 5. Convert the `.p12` Private Key to PEM

macOS may export the `.p12` using an older encryption algorithm such as RC2.

If normal OpenSSL gives an error such as:

```text
Algorithm (RC2-40-CBC : 0)
```

use OpenSSL's legacy provider:

```bash
openssl pkcs12 -legacy \
  -in wallet-pass-key.p12 \
  -nocerts \
  -out wallet-pass-key.pem
```

Enter the `.p12` export password.

Then create an unencrypted PEM copy:

```bash
openssl pkey \
  -in wallet-pass-key.pem \
  -out wallet-pass-key-unencrypted.pem
```

The resulting file:

```text
wallet-pass-key-unencrypted.pem
```

is the private key used for signing.

---

# 6. Verify the Private Key

Run:

```bash
openssl pkey \
  -in wallet-pass-key-unencrypted.pem \
  -check \
  -noout
```

A successful result should indicate:

```text
Key is valid
```

---

# 7. Convert the Apple Certificate to PEM

Apple provides the Pass Type ID certificate as a `.cer` file.

For example:

```text
pass.cer
```

Convert it:

```bash
openssl x509 \
  -inform DER \
  -in pass.cer \
  -out pass-cert.pem
```

You should now have:

```text
pass-cert.pem
```

Verify it:

```bash
openssl x509 \
  -in pass-cert.pem \
  -noout \
  -subject \
  -issuer
```

---

# 8. Obtain the Apple WWDR Certificate

Download the current Apple Worldwide Developer Relations (WWDR) intermediate certificate from Apple's Certificate Authority page:

https://www.apple.com/certificateauthority/

Apple's documentation specifically notes that a valid Wallet signature includes the Apple Worldwide Developer Relations Intermediate Certificate.

For example, the downloaded certificate may be:

```text
AppleWWDRCAG4.cer
```

Convert it to PEM:

```bash
openssl x509 \
  -inform DER \
  -in AppleWWDRCAG4.cer \
  -out wwdr.pem
```

Verify it:

```bash
openssl x509 \
  -in wwdr.pem \
  -noout \
  -subject \
  -issuer
```

---

# 9. Final Certificate Files

At this point, the signing setup should contain:

```text
wallet-pass-key-unencrypted.pem
pass-cert.pem
wwdr.pem
```

Their purposes are:

| File                              | Purpose                                |
| --------------------------------- | -------------------------------------- |
| `wallet-pass-key-unencrypted.pem` | Private key used to sign the manifest  |
| `pass-cert.pem`                   | Apple Pass Type ID signing certificate |
| `wwdr.pem`                        | Apple WWDR intermediate certificate    |

Keep these files private.

---

# 10. Verify the Certificate and Private Key Match

Create a temporary public key from the certificate:

```bash
openssl x509 \
  -in pass-cert.pem \
  -pubkey \
  -noout > cert-public.pem
```

Create a temporary public key from the private key:

```bash
openssl pkey \
  -in wallet-pass-key-unencrypted.pem \
  -pubout > key-public.pem
```

Compare them:

```bash
diff cert-public.pem key-public.pem
```

If `diff` produces **no output**, the certificate and private key match.

The temporary files can then be deleted:

```bash
rm cert-public.pem key-public.pem
```

---

# 11. Create the Pass Source

Create a directory for the pass.

Example:

```text
my-pass/
├── pass.json
├── icon.png
├── icon@2x.png
├── logo.png
└── logo@2x.png
```

Apple's pass source consists of `pass.json`, required images, and optional localization/resources.

---

# 12. Create `pass.json`

A basic event pass might look like:

```json
{
  "formatVersion": 1,
  "passTypeIdentifier": "pass.com.example.event",
  "serialNumber": "123456789",
  "teamIdentifier": "YOUR_TEAM_ID",
  "organizationName": "Example Organization",
  "description": "Example Event Pass",
  "logoText": "Example Event",
  "foregroundColor": "rgb(255,255,255)",
  "backgroundColor": "rgb(0,0,0)",

  "eventTicket": {
    "primaryFields": [
      {
        "key": "event",
        "label": "EVENT",
        "value": "Example Event"
      }
    ]
  }
}
```

Event tickets use the `eventTicket` pass style.

---

# 13. Be Careful With Expiration Dates

If `pass.json` contains:

```json
"expirationDate": "2026-01-01T00:00:00-05:00"
```

and that date has already passed, Wallet may treat the pass as expired.

For testing, either use a future date:

```json
"expirationDate": "2027-09-29T23:59:59-05:00"
```

or omit the expiration date if the pass does not need one.

---

# 14. Create `manifest.json`

The manifest contains a SHA-1 hash for every file included in the pass bundle, except:

```text
manifest.json
signature
```

A manifest looks like:

```json
{
  "pass.json": "SHA1_HASH",
  "icon.png": "SHA1_HASH",
  "icon@2x.png": "SHA1_HASH",
  "logo.png": "SHA1_HASH"
}
```

### Automatically generate it

From inside the pass directory:

```bash
python3 - <<'PY'
import hashlib
import json
import os

files = {}

for filename in os.listdir("."):
    if filename in ["manifest.json", "signature"]:
        continue

    if os.path.isfile(filename):
        with open(filename, "rb") as f:
            files[filename] = hashlib.sha1(f.read()).hexdigest()

with open("manifest.json", "w") as f:
    json.dump(files, f, indent=2)
PY
```

Check it:

```bash
cat manifest.json
```

---

# 15. Avoid `.DS_Store`

macOS can create:

```text
.DS_Store
```

inside directories.

Do not include this in your pass.

Check:

```bash
ls -la
```

If `.DS_Store` exists:

```bash
rm .DS_Store
```

If `.DS_Store` was included when the manifest was created, regenerate the manifest after deleting it.

---

# 16. Create the Signature

Use OpenSSL to sign `manifest.json` :

```bash
openssl smime -binary -sign \
  -certfile ~/Documents/wwdr.pem \
  -signer ~/Documents/pass-cert.pem \
  -inkey ~/Documents/wallet-pass-key-unencrypted.pem \
  -in manifest.json \
  -out signature \
  -outform DER \
  -nodetach
```

If the command succeeds, a file named:

```text
signature
```

is created.

The final pass directory should now look like:

```text
my-pass/
├── pass.json
├── icon.png
├── icon@2x.png
├── logo.png
├── logo@2x.png
├── manifest.json
└── signature
```

---

# 17. Verify the Signature

You can verify the generated signature with:

```bash
openssl smime -verify \
  -inform DER \
  -in signature \
  -content manifest.json \
  -CAfile wwdr.pem \
  -noverify
```

A successful result should contain:

```text
Verification successful
```

---

# 18. Create the `.pkpass`

From inside the pass directory:

```bash
zip -r my-pass.pkpass . \
  -x "*.DS_Store" \
  -x "my-pass.pkpass"
```

This creates:

```text
my-pass.pkpass
```

---

# 19. Inspect the `.pkpass`

Check its contents:

```bash
unzip -l my-pass.pkpass
```

It should contain files such as:

```text
pass.json
icon.png
icon@2x.png
logo.png
logo@2x.png
manifest.json
signature
```

It should **not** contain:

```text
.DS_Store
wallet-pass-key.p12
wallet-pass-key.pem
wallet-pass-key-unencrypted.pem
pass-cert.pem
wwdr.pem
```

The private key and certificates must never be placed inside the `.pkpass`.

---

# 20. Test the `.pkpass` Without Next.js

A simple Python HTTP server can be used for local testing.

Create:

```text
server.py
```

with:

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler


class PassHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".pkpass": "application/vnd.apple.pkpass",
    }


server = HTTPServer(("0.0.0.0", 8000), PassHandler)

print("Serving pass on port 8000...")
server.serve_forever()
```

Start it:

```bash
python3 server.py
```

---

# 21. Open the Pass on an iPhone

Make sure the Mac and iPhone are on the same Wi-Fi network.

Find the Mac's local IP:

```bash
ipconfig getifaddr en0
```

For example:

```text
192.168.1.25
```

On the iPhone, open Safari and navigate to:

```text
http://192.168.1.25:8000/my-pass.pkpass
```

Safari should recognize the file as an Apple Wallet pass.

Tap:

```text
Add
```

The pass should appear in Apple Wallet.

---

# 22. Troubleshooting

## Safari downloads the file but doesn't recognize it

Make sure the server sends:

```text
application/vnd.apple.pkpass
```

The included Python server explicitly sets this MIME type.

---

## Wallet opens but doesn't add the pass

Check:

```text
pass.json
manifest.json
signature
```

Common problems include:

* Invalid JSON
* Incorrect Pass Type ID
* Pass Type ID doesn't match the signing certificate
* Incorrect Team ID
* Invalid signature
* Missing WWDR certificate
* Incorrect manifest hashes

Apple specifically lists malformed JSON, misspelled keys/values, mismatched Pass Type IDs, and signatures missing the WWDR intermediate certificate as common Wallet pass problems.

---

## Pass appears and immediately disappears

Check:

```json
"expirationDate"
```

Make sure it isn't in the past.

Also remember that Wallet can use time and location information to determine when passes should be relevant.

---

## OpenSSL says:

```text
Algorithm (RC2-40-CBC : 0)
```

Use:

```bash
openssl pkcs12 -legacy \
  -in wallet-pass-key.p12 \
  -nocerts \
  -out wallet-pass-key.pem
```

---

## OpenSSL says:

```text
No signer certificate specified
```

Make sure the command is formatted correctly.

For example, this is valid:

```bash
openssl smime -binary -sign -certfile ~/Documents/wwdr.pem -signer ~/Documents/pass-cert.pem -inkey ~/Documents/wallet-pass-key-unencrypted.pem -in manifest.json -out signature -outform DER -nodetach
```

If using multiple lines, there must be **nothing after each `\`**.

Correct:

```bash
openssl smime -binary -sign \
  -certfile ~/Documents/wwdr.pem \
  -signer ~/Documents/pass-cert.pem \
  -inkey ~/Documents/wallet-pass-key-unencrypted.pem \
  -in manifest.json \
  -out signature \
  -outform DER \
  -nodetach
```

---

# 23. Important: Changing the Pass Requires Re-signing

If you modify **any file included in `manifest.json`**, you need to:

```text
Change pass
    ↓
Regenerate manifest.json
    ↓
Regenerate signature
    ↓
Recreate .pkpass
```

For example:

```text
pass.json changed
    ↓
manifest.json must change
    ↓
signature must change
    ↓
.pkpass must be recreated
```

Do not simply edit `pass.json` inside an existing `.pkpass`.

---

# 24. Security

Never commit these files to Git:

```text
*.p12
*.pem
```

For example, add:

```gitignore
*.p12
*.pem
certs/
```

The private key is especially sensitive.

For a real application, keep the signing certificate, private key, and WWDR certificate on the **server**, not in the browser or frontend bundle.

---

# 25. Moving This Into Next.js

The manual process above is useful for validating that Apple Wallet signing works.

The eventual application architecture should be:

```text
Next.js
│
├── API route
│     │
│     ├── Generate pass.json
│     │
│     ├── Generate manifest.json
│     │
│     ├── Sign manifest.json
│     │
│     ├── Create .pkpass
│     │
│     └── Return .pkpass
│
└── Server-side secrets
      │
      ├── Pass Type ID certificate
      ├── Private key
      ├── WWDR certificate
      ├── Team ID
      └── Pass Type ID
```

The API response should use:

```http
Content-Type: application/vnd.apple.pkpass
```

Apple supports distributing passes through apps, email, and the web, so the final Next.js implementation can provide the pass directly to the user's iPhone.

---

# 26. Current Working Setup

The manual setup has been successfully tested when:

```text
Pass Type ID
        ↓
Apple Pass Type ID certificate
        ↓
CSR-generated private key
        ↓
Private key exported from Keychain
        ↓
.p12 → PEM conversion
        ↓
WWDR certificate
        ↓
pass.json
        ↓
manifest.json
        ↓
OpenSSL signature
        ↓
.pkpass
        ↓
Local Python server
        ↓
iPhone Safari
        ↓
Apple Wallet
```

The `.pkpass` successfully opened in Apple Wallet.

The pass initially appeared to disappear because its `expirationDate` was in the past; after correcting the expiration date, the pass could be added normally.

---

# 27. Official Apple Documentation

* Apple Wallet overview:
  https://developer.apple.com/wallet/get-started/

* Create Wallet identifiers and certificates:
  https://developer.apple.com/help/account/capabilities/create-wallet-identifiers-and-certificates

* Creating the source for a pass:
  https://developer.apple.com/documentation/walletpasses/creating-the-source-for-a-pass

* Event passes:
  https://developer.apple.com/documentation/walletpasses/creating-an-event-pass-using-semantic-tags

* Wallet certificate authority / WWDR certificates:
  https://www.apple.com/certificateauthority/

* Wallet / PassKit:
  https://developer.apple.com/documentation/PassKit/wallet
  
* Signpass Archive:
https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/YourFirst.html#//apple_ref/doc/uid/TP40012195-CH2-SW1