---
title: "What a Hash Does — and Doesn't — Prove"
description: "A hash is the backbone of evidence integrity. It is also widely misunderstood. Here is exactly what a digest can and cannot tell you."
date: 2026-10-17
status: "Published"
author: "Forensyra"
tags: ["Fundamentals", "Integrity", "Method"]
---
Ask an analyst what a hash proves and you will often hear "that the evidence hasn't changed". True, but incomplete — and the gap is where cases get uncomfortable.

## What a cryptographic hash gives you

A hash function takes any input and returns a fixed-length digest. Three properties do the work:

- **Deterministic.** The same input always produces the same digest.
- **Avalanche.** Changing one bit of input changes roughly half the output bits.
- **Preimage and collision resistant.** For SHA-256, you cannot practically reverse a digest or find two inputs with the same digest.

Practical upshot: if two copies produce the same SHA-256, they are the same bytes.

## What it does not prove

**That the content is true.** A hash commits to bytes, not to meaning. A forged document hashes perfectly.

**That the file is unaltered since creation.** It proves the copy matches the reference *at the moment you hashed it*. A file could have been edited before acquisition and the hash would still agree.

**That a specific person or device produced it.** Tying bytes to a person requires provenance: where the device was, who had access, what the logs say.

**That the source was preserved.** If your only "original" is a working copy, you have proven consistency between copies, not custody of the original.

## Practical rules we follow

1. **Hash at acquisition and again after analysis.** The first proves the copy, the second proves you did not change it.
2. **Record the algorithm**, not just the value. A 32-character hex string means nothing without saying MD5.
3. **Keep the digest in the case log**, not only in a filename. Filenames get renamed; logs get attached to reports.
4. **Use SHA-256 for integrity claims today.** MD5 and SHA-1 are broken for collision resistance and should only be used to match against legacy hash sets.

## Different hashes, different jobs

There are two distinct uses and they are often conflated. **Integrity hashing** answers "is this the same file I acquired?" — SHA-256, recorded in a custody log. **Matching hashing** answers "do I already know what this file is?" — MD5/SHA-1 against sets like the NSRL or a known-bad list, where legacy algorithms are fine because you are de-duplicating, not proving.

Getting this distinction right is what separates a defensible finding from a confident-sounding guess.
