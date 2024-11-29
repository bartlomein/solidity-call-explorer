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
