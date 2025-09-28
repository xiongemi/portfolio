---
title: 'How a JavaScript Developer Could Prevent Supply Chain Attacks'
excerpt: 'Recently, the JavaScript community has been shaken by a series of supply
chain attacks. These are not bugs in code we wrote, but malicious code
in the tools and libraries we download from npm (the main registry for
JavaScript packages).'
date: '2025-09-028'
author: 'Emily Xiong'
---

# How a JavaScript Developer Could Prevent Supply Chain Attacks

Recently, the JavaScript community has been shaken by a series of supply
chain attacks. These are not bugs in code we wrote, but malicious code
in the tools and libraries we download from npm (the main registry for
JavaScript packages).

Two big incidents happened in just a few weeks:

- **August 26, 2024**: Malicious versions of
  [Nx](https://www.npmjs.com/package/nx) were published after an
  attacker obtained credentials. Nx is a popular tool many developers
  use daily.
  [Malicious versions of Nx and some supporting plugins were
  published](https://github.com/nrwl/nx/issues)

- **September 8, 2024**: A well-known developer's npm account was
  hijacked through social engineering. The attacker published
  malicious versions of widely used packages like chalk (used for
  colored console output) and debug (used for logging).
  [Version 5.6.1 of chalk
  compromised](https://github.com/chalk/chalk/issues/656)

---

## ⚡ What's a "supply chain attack"?

Think about it like this:

- If you buy a phone charger from a store, you trust it will charge
  your phone safely.
- A supply chain attack is like someone sneaking into the factory,
  swapping the safe charger with one that looks identical but steals
  your data when you plug it in.

In software, it works the same: developers use thousands of small
open-source packages (like Lego bricks). If one brick is secretly
swapped with a compromised one, the entire structure may be unsafe.

---

## 🎲 Why I got lucky this time

Honestly, I was lucky. These malicious versions were online for only a
few hours before they were removed. Since I didn't update my packages
right away, I dodged the bullet.

In other words:

> I was lucky because I was lazy.

I only heard about the attacks after they were already taken down.
Thankfully, the malicious versions were only online for a few hours
before being removed --- but it shows how fragile the ecosystem can be.
This time I didn't get burned, but it made me wonder: is there actually
a way to prevent this from happening to me in the future?

---

## 🏗️ Some ideas I've been thinking about

These are not perfect solutions --- in fact, most of them come with
trade-offs --- but they're worth considering:

### 1. Pin the Package Version (not recommended)

- **Pros**: You're guaranteed to use the exact version you know is
  safe.
- **Cons**: Your `package.json` could get very long, and eventually
  you do need to upgrade. If the next supply chain attack happens at
  the moment you decide to upgrade, you're still exposed.

### 2. Choose the Second Latest Version (not recommended)

- **Pros**: Reduces the chance of installing something that was just
  hacked a few hours ago.
- **Cons**: This is hard to keep track of, adds mental overhead, and
  you might miss important bug fixes.

### 3. Disable Postinstall Scripts (not recommended)

Most npm malware hides in `preinstall`, `install`, or `postinstall`
scripts. These are small commands that run automatically after you
install a package.

In CI systems, I could turn them off by default:

```bash
npm ci --ignore-scripts
```

Or globally:

```bash
export NPM_CONFIG_IGNORE_SCRIPTS=true
```

Locally, I could add this to `.npmrc`:

```ini
registry=https://registry.npmjs.org/
always-auth=true
ignore-scripts=true
```

- **Pros**: Blocks the most common attack path.
- **Cons**: Some legitimate packages actually need those scripts to
  run. This could break tools I rely on.

### 4. Use Lockfile-lint

[Lockfile-lint](https://github.com/lirantal/lockfile-lint) is a CLI tool
to lint a lockfile for security policies. It validates that your
lockfile only pulls from the official npm registry, not some random
GitHub repo or HTTP link.

In `package.json`, add preinstall script:

```json
"preinstall": "npx lockfile-lint --path package-lock.json --allowed-hosts npm --allowed-schemes https:"
```

- **Pros**: Blocks "surprise" sources.
- **Cons**: Doesn't help if the malicious package is actually
  published to npm itself (like Nx or chalk).

### 5. Run NPM Audit

Add `npm audit` command to preinstall:

```json
"preinstall": "npm audit --audit-level=moderate"
```

What this does:\

- Scans your dependencies against npm's vulnerability database.
- Reports if there are known issues.
- Exits with an error if vulnerabilities are "moderate" or higher.

- **Pros**: Helps catch known bad versions.
- **Cons**: Completely useless against zero-day attacks --- like the
  Nx and chalk incidents --- because those malicious versions were
  brand new and not yet in the database.

### 6. Paid SaaS Tools

There are paid tools like:\

- [Socket.dev](https://socket.dev) (`npx socket protect`) -- flags risky
  patterns like install scripts, network, telemetry, abandoned authors,
  etc.
- [Snyk](https://snyk.io) (`snyk test`) -- combines known
  vulnerabilities with some supply-chain checks.

- **Pros**: They go beyond simple CVE databases, sometimes catching
  malicious packages much earlier.
- **Cons**: Not free if you want team-wide coverage.

---

## 🕰️ A bit of history

This reminded me of the npm Left Pad incident almost 10 years ago. Back
then, a tiny package was removed from npm, and suddenly half the
internet broke.

[Left Pad Incident
(Wikipedia)](https://en.wikipedia.org/wiki/Npm_left-pad_incident)

Now the problem isn't disappearing packages, but malicious ones being
uploaded. Different problem, same root issue: we rely on thousands of
tiny open-source packages written by strangers.

---

## 🌍 Final thoughts

Open source is incredibly powerful --- it lets us build amazing things
quickly. But it also relies on everyone being a "good citizen." And
humans are humans: people make mistakes, accounts get hacked, attackers
exploit weak points.

These ideas (pinning versions, skipping latest releases, disabling
scripts, linting lockfiles, audits, scanners) are all imperfect. They
reduce risk, but none truly prevent a supply chain attack.

At the end of the day, I feel like this is partly unavoidable.

Open source gives us convenience, speed, and collaboration --- but it
also comes with fragility.

This time, I was lucky. I was spared because I was lazy and didn't
update right away. 😂

Of course, staying lazy isn't a real solution --- but waiting a little
before upgrading might just keep you safe.
