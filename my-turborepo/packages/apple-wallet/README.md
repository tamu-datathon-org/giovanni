For the certifications they need to be placed in their own folder

├── certificates
│   ├── pass-cert.pem
│   ├── wallet-pass-key-unencrypted.pem
│   └── wwdr.pem

To test the apple pass run within apple-wallet folder  `pnpm test:pass` this generates a test.pkpass that can then be airdropped to a phone. It will automatically