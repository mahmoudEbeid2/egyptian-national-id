<div align="center">
  <h1>🇪🇬 Egyptian National ID 🇪🇬</h1>
  <p><strong>The Ultimate, Bulletproof Node.js/TypeScript Engine for Parsing, Validating, Generating, Filtering, and Analyzing Egyptian National IDs.</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/egyptian-national-id.svg?style=flat-square)](https://www.npmjs.org/package/egyptian-national-id)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

<br />

Welcome to the **gold standard** Node.js and TypeScript library for processing Egyptian National IDs. 

Built with scalability, extreme edge-case handling, and Developer Experience (DX) in mind, `egyptian-national-id` is the definitive engine for modern Web and Backend applications whether you are engineering a robust Government Portal, a Fintech KYC system, an E-commerce platform, or a vast HR database.

## ✨ Why Choose This Engine?

- 🛡️ **Military-Grade Validation**: Goes far beyond regex. It performs deep mathematical validations including string length constraints, positive integer verification, absolute date-of-birth existence, rigorous century logics, and finalizes with the highly sophisticated **Modulo 11 Checksum Algorithm** to ensure the ID was genuinely issued by the Civil Registry.
- 🎛️ **Advanced Recursive Filtering**: Instantly sift through thousands of users! Search, map, and filter massive Arrays or Objects by age, exact birth dates, governorates, regions, or gender using our blazing fast case-insensitive filter engine.
- 🚀 **100% Type-Safe (TypeScript)**: Built from the ground up in strict TypeScript to provide beautiful exact autocomplete, extensive types (`Governorate`, `NationalIdAnalysis`), and absolute peace of mind.
- 🛠️ **All-in-One Toolkit**: Stop relying on 10 different snippets! Enjoy built-in Parsers, Generators (for your E2E tests), Bulk Statistical Analyzers, flexible Data Extractors, and even a global CLI Interface!
- 🎨 **Drop-in Form Schemas**: Ship faster! We expose ready-to-use Regex patterns and structured error maps that seamlessly plug directly into `zod`, `yup`, or `React Hook Form`.

---

## 📦 Installation

Install via your favorite package manager:

```bash
npm install egyptian-national-id
# or
yarn add egyptian-national-id
# or
pnpm add egyptian-national-id
```

---

## 📖 Table of Contents

1. [Basic Usage](#1-basic-usage-parsing--validating)
2. [Data Processing (Engine)](#2-data-processing-engine)
3. [Helper Utilities](#3-helper-utilities)
4. [Generating Dummy IDs](#4-generating-dummy-ids-for-testing)
5. [Form Validation (Regex)](#5-form-validation-regex)
6. [CLI Capabilities](#6-cli-capabilities)

---

## 1. Basic Usage (Parsing & Validating)

### 🧐 Validating an ID
Need to know if an ID physically exists and passes structural and mathematical rules?

```javascript
import { validate } from "egyptian-national-id";

const isValid = validate("30201011234557");
console.log(isValid); // false (Invalid check digit!)

const isValid2 = validate("29912010112341");
console.log(isValid2); // true
```

### � Sanitizing IDs
If your users input IDs containing spaces, dashes, or Arabic numerals (٠-٩), you can effortlessly clean the string before processing.

```javascript
import { sanitize } from "egyptian-national-id";

const dirtyId = " 301050-501755٩٧ ";
const cleanId = sanitize(dirtyId);

console.log(cleanId); // "30105050175597"
```

### �🧠 Parsing an ID
Extract all demographic information hidden inside the National ID securely.

```javascript
import { parse } from "egyptian-national-id";

const data = parse("30105050175597"); 
/* 
Returns:
{
  nationalId: "30105050175597",
  birthDate: 2001-05-05T00:00:00.000Z, // Date Object
  birthYear: 2001,
  birthMonth: 5,
  birthDay: 5,
  age: 24, // Dynamically calculated based on the current year
  gender: "Male",
  governorate: { code: 1, name: "Cairo", nameAr: "القاهرة", region: "Cairo" },
  region: "Cairo",
  insideEgypt: true,
  isAdult: true // >= 18
}
*/
```

---

## 2. Data Processing (Engine)

If your database returns an array of thousands of IDs, the Engine module allows you to filter, map, and analyze them blazingly fast.

### 🔍 Filtering

The `filter` function is incredibly flexible and case-insensitive. You can pass raw arrays of strings, or arrays of Objects!

```javascript
import { filter } from "egyptian-national-id";

const staffIds = ["30105050175597", "29912010112341", "invalid_id_here"];

// Get only Males
const males = filter(staffIds, { gender: "male" }); // Case-insensitive!

// Get adults (18+) from Alexandria
const alexAdults = filter(staffIds, { 
    region: "alexandria", 
    ageFrom: 18 
});
```

### 🎛️ Available Filter Properties
You can mix and match any of these properties inside your filter object!

| Property | Type | Description |
|-----------|---------|-------------|
| `isAdult` | `boolean` | Find people above or equal to 18 years old. |
| `gender` | `"Male" \| "Female"` | Filter by gender (Case-insensitive 🪄). |
| `region` | `string` | Filter by a single region (e.g. `"Cairo"`, `"Delta"`). |
| `regions` | `string[]` | Filter by multiple regions `["Cairo", "Canal"]`. |
| `governorateCode` | `number` | Filter by a specific Governorate code (e.g., `1` for Cairo). |
| `governorates` | `number[]` | Filter by an array of codes `[1, 2, 88]`. |
| `birthYear` | `number` | People born in a specific year (`1999`). |
| `birthYearFrom` | `number` | People born starting from a year (`2000`). |
| `birthYearTo` | `number` | People born up to a year (`2010`). |
| `birthDateFrom` | `Date` | People born after an exact JavaScript `Date` object. |
| `birthDateTo` | `Date` | People born before an exact JavaScript `Date` object. |
| `ageFrom` | `number` | Minimum age required. |
| `ageTo` | `number` | Maximum age limit. |
| `insideEgypt` | `boolean` | Whether they were born inside Egypt or abroad (code 88). |

**Filtering Arrays of Objects?** No problem. Just specify the `key` holding the ID!

```javascript
const database = [
  { id: 1, fullname: "Ahmed", nid: "30105050175597" },
  { id: 2, fullname: "Mona", nid: "29912010112341" }
];

const menOfCairo = filter(database, { 
    key: "nid", // The property containing the ID
    gender: "male",
    region: "cairo" 
});

console.log(menOfCairo); // Returns the full Objects! [{ id: 1, fullname: "Ahmed", nid: "..." }]
```

### 🗺️ Mapping with Analysis
Sometimes you want to attach the extracted data directly to your Original Dataset! Use `mapWithAnalysis`.
It safely ignores items with invalid IDs instead of crashing!

```javascript
import { mapWithAnalysis } from "egyptian-national-id";

const enrichedData = mapWithAnalysis(database, "nid");
/* 
Returns a combined Object array:
[{
    id: 1, 
    fullname: "Ahmed", 
    nid: "30105050175597",
    analysis: { age: 24, gender: "Male", governorate: {...} } // The newly attached parse!
}]
*/
```

### 📊 Bulk Statistics
Get instant demographics from an array of IDs. It safely skips invalid IDs without crashing.

```javascript
import { stats } from "egyptian-national-id";

const report = stats(staffIds);
/*
Returns:
{
  total: 2,
  adults: 2,
  males: 1,
  females: 1,
  averageAge: 24.5,
  governoratesDistribution: { "Cairo": 1, "Alexandria": 1 },
  insideEgypt: 2,
  outsideEgypt: 0
}
*/
```

---

## 3. Helper Utilities

Sometimes you just want a simple `boolean` answer without dealing with whole payload objects.

```javascript
import { 
    isMale, 
    isFemale, 
    isAdult, 
    isInsideEgypt, 
    isFromGovernorate, 
    isFromRegion 
} from "egyptian-national-id";

const id = "30105050175597";

isMale(id); // true
isAdult(id); // true
isInsideEgypt(id); // true
isFromRegion(id, "Cairo"); // true
```

---

## 4. Generating Dummy IDs (For Testing)

If you are unit testing your application, you can programmatically generate 100% mathematically valid National IDs!

```javascript
import { generateId } from "egyptian-national-id";

const randomId = generateId(); // Totally random valid ID

const specificId = generateId({ 
    gender: "Female", 
    birthYear: 1999, 
    governorateCode: 2 // Alexandria
});

console.log(specificId); // 299XXXX02XXXXX (Valid modulo 11 Checksum)
```

---

## 5. Form Validation (Regex)

Building a React, Vue, or Angular Frontend? We expose the strict validation tools.

```javascript
import { NationalIdRegex, NationalIdSchemaMap } from "egyptian-national-id";

// 1. Raw Regex Usage
const isValid = NationalIdRegex.test("30105050175597");

// 2. Drop it in Zod!
import { z } from "zod";
const schema = z.string().regex(NationalIdSchemaMap.pattern, { 
    message: NationalIdSchemaMap.errorMessage 
});
```

---

## 6. CLI Capabilities

Did you know this package comes with a CLI tool?

If you install this toolkit globally (`npm install -g egyptian-national-id`), or run it via `npx`, you can use it right in your terminal!

```bash
# Validate an ID
npx egyid validate 30105050175597

# Analyze an ID directly in your terminal
npx egyid analyze 30105050175597

# Generate a mock ID for testing
npx egyid generate --female --year 1995 --gov 1

# Filter through multiple IDs in your console
npx egyid filter 30105050175597 29912010112341 --gender male --region cairo

# Get instant analytics on a dataset of IDs
npx egyid stats 30105050175597 29912010112341
```

---

### 👨‍💻 Author

**Mahmoud Ebeid**
- 💼 [LinkedIn](https://www.linkedin.com/in/mahmoud-ebead/)
- 🐙 [GitHub](https://github.com/mahmoudEbeid2)

Designed with ❤️ to make Egyptian Software Engineering much easier.
