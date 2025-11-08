
## 📝 Description
Build an AI-powered assistant that dynamically analyzes multi-page, multi-modal documents to classify them into **Public**, **Confidential**, **Highly Sensitive**, or **Unsafe** categories. The solution should leverage a configurable prompt library to generate dynamic prompt trees, incorporate Human-in-the-Loop (HITL) feedback to improve accuracy over time, and support both interactive and batch processing with real-time status updates. Pre-processing checks (e.g., legibility, page/image counts) are required. Outputs must include citation-based evidence pointing to the exact pages or images that led to each classification. Optionally, teams may employ two LLMs to cross-verify classifications to reduce HITL needs. The UI should be business-friendly with visualizations, detailed classification reports, audit trails, and easy file management, while ensuring compliance with data privacy and security policies.

---

## 📂 Categories
- **Sensitive/Highly Sensitive**: Content that includes PII like SSNs, account/credit card numbers, and proprietary schematics (e.g., defense or next‑gen product designs of military equipment).
- **Confidential**: Internal communications and business documents, customer details (names, addresses), and non-public operational content.
- **Public**: Marketing materials, product brochures, public website content, generic images.
- **Unsafe Content**: Content must be evaluated for child safety and should not include hate speech, exploitative, violent, criminal, political news, or cyber-threat content.

---

## ✅ Evaluation Criteria
- **Multi-modal input**: Accept text, images, and optional video.
- **Interactive and batch processing modes** with real-time status updates.
- **Pre-processing checks**: Document legibility, page and image count.
- **Dynamic prompt tree generation** from a configurable prompt library.
- **Citation-based results**: Reference exact pages or images for audit and compliance.
- **Safety monitoring**: Automatically detect Unsafe content and flag for human review.
- **HITL feedback loop**: Enable SMEs to validate outputs and refine prompt logic.
- **Double-layered AI validation (optional)**: Two LLMs to cross-verify classifications.
- **Rich UI**: Clear visualizations, detailed classification reports, audit trails, and file management.

---

## 🧪 Test Cases (for Judging & Testing)

### 🟢 **TC1 — Public Marketing Document**
**Input**: Multi-page brochure or program viewbook (Public)
**Expected Category**: Public
**Judging Focus**: Public; verify pre-checks and page-level citations.
**Expected Outcome**:
- # of pages in the document
- # of images
- **Evidence Required**: Cite pages containing only public marketing statements; confirm no PII or confidential details.
- **Content Safety**: Content is safe for kids.

---

### 🔴 **TC2 — Filled In Employment Application (PII)**
**Input**: Application form containing synthetic PII (name, address, SSN)
**Expected Category**: Highly Sensitive
**Judging Focus**: PII detection and precise citations; HITL handoff optional.
**Expected Outcome**:
- # of pages in the document
- # of images
- **Evidence Required**: Cite the field(s) containing SSN or other PII; show redaction suggestions if supported.
- **Content Safety**: Content is safe for kids.

---

### 🟡 **TC3 — Internal Memo (No PII)**
**Input**: Internal project memo with milestones/risks; no PII
**Expected Category**: Confidential
**Judging Focus**: Policy reasoning for internal but non-sensitive content; UI explanation clarity.
**Expected Outcome**:
- # of pages in the document
- # of images
- **Evidence Required**: Cite internal-only operational details; confirm absence of PII.
- **Content Safety**: Content is safe for kids.

---

### ✈️ **TC4 — Stealth Fighter with Part Names**
**Input**: High-resolution image of stealth fighter
**Expected Category**: Confidential
**Judging Focus**: Image handling, region citation, policy explanation.
**Expected Outcome**:
- # of pages in the document
- # of images
- **Evidence Required**: Cite the region with the serial; explain policy mapping for identifiable equipment.
- **Content Safety**: Content is safe for kids.

---

### ⚠️ **TC5 — Testing Multiple Non-Compliance Categorizations**
**Input**: Document embedded with a stealth fighter and unsafe content
**Expected Category**: Confidential and Unsafe
**Judging Focus**: Image handling, region citation, policy explanation.
**Expected Outcome**:
- # of pages in the document
- # of images
- **Evidence Required**: Cite the region with the serial; explain policy mapping for identifiable equipment and where and why content is unsafe.
- **Content Safety**: Content is safe for kids.

---

## 🏆 Scoring & Rubric
- **Classification Accuracy (50%)**: Precision/recall on test cases, correct category mapping, clarity of citations.
- **Reducing HITL involvement (20%)**: Confidence scoring, dual-LLM consensus, reviewer queue, reduced manual review time.
- **Processing Speed (10%)**: Throughput and responsiveness using lightweight or SLM models; cite your model.
- **User Experience & UI (10%)**: Clear explanations, audit-ready reports, region highlights, and easy file management.
- **Content Safety (10%)**: Validate all content for child safety; ensure no hate speech, violence, or unsafe material.

---

## 📤 Submission Notes
- Provide an **end-to-end demo video** showing document upload and categorization flow.
- The AI should **summarize and explain** why a document was categorized a certain way (reasoning module).
- **Cite the model(s)** used for classification in your submission.
