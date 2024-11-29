# Solidity Call Explorer

A tool for exploring and visualizing Ethereum transaction calls and events.

## Features

- View transaction call traces in a hierarchical tree structure
- Decode contract events and function calls
- Search transactions by hash
- View of Events emitted by smart contracts during transaction execucution

## Prerequisites

- Node.js 18+
- npm/yarn
- Etherscan API key
- Alchemy API key

## Setup

1. Clone the repository:

```bash
git clone git@github.com:bartlomein/solidity-call-explorer.git
cd solidity-call-explorer
npm install
```

2. Install dependencies

```bash
npm install
```

3.Create a .env file in the root directory with your API keys:

```bash
NEXT_PUBLIC_ETHERSCAN_API=your_etherscan_api_key
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_api_key
```

## Running the application

```bash
npm run dev
```

## Testing

```bash
npm test
```

## Analysis

### Design Decisions

This is an application to be able to view transaction call and event data for a particular transaction.

#### Tech Stack

Next.js 15
React 18
TypeScript
Tailwind CSS
Ethers.js
Jest
React Testing Library
shadcn/ui components

I have chosen the above tech stack as it is easy to use, read and work with.

- NextJS was chosen as even though I did not do any server side rendering, the next step of this SPA would be to make each transaction hash into a route and handle server side calling on a route by route basis.

- Tailwind is very easy to work with and read.

- Ethers is smaller than Web3 js and is easier to work with.

- Jest and React testing library are the standard when it comes to testing.

- Shadcn/ui components allow for a quick install and customizability as you only install what you need and have the codebase on disk ready to be changed to suit your needs.

### Trade offs

As written above, one of the biggest trade offs is client side vs server side. as this is just a SPA as noted in the assignement notes, I went with a client side implementation.

To grow this application and make it a truly server side application, Once a user would search for a transaction, and the tx hash was correct, I would route to /transaction/[hash]. That way I could do the quering of data server-side giving a few benefits such as obfuscating API keys and faster paint times.

### Potential optimizations

Biggest optimization would be to not delay event ABI call look up. As I am delaying to go around rate limits, the events come in later because of the delays.

Splitting to a server-side page based application would also code split per page. As there would now by 2 pages, some of the code would be split and server to the client as needed.

### Short cuts

When I first started working on this application, I did not have access to trace call data. I figured out that I can get the logs, get the needed ABI and decode it to get more data. However I could not figure out how to match them to the corresponding calls. I wanted to ship this first as I continue to research how to connect them.

As this is mostly a desktop first application, I did some quick mobile styling but it could use more work there as a fast follow.
