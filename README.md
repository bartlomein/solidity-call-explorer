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

3. Create a .env file in the root directory with your API keys:

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

## Design Decisions, Trade-offs, Potential Optimizations, and Short-cuts

This is an application to be able to view transaction call and event data for a particular transaction.

#### Tech Stack

- Next.js 15: Chosen for its ease of use and the potential to extend the application to server-side rendering in the future. Although the current implementation is a Single Page Application (SPA), Next.js provides the flexibility to transition to server-side rendering.

- React 18: Provides a robust framework for building the user interface.

- TypeScript: Ensures type safety and improves code quality.

- Tailwind CSS: Chosen for its utility-first approach, making it easy to style components.

- Ethers.js: Preferred over Web3.js due to its smaller size and ease of use.

- Jest and React Testing Library: Standard tools for testing React applications.

- shadcn/ui components: Allows for quick installation and customization, as only the necessary components are installed and can be modified as needed.

### Trade offs

Client-side Implementation: The current implementation is entirely client-side, which simplifies the initial development and deployment. However, this approach exposes API keys and may result in slower initial load times due to client-side data fetching.

Server-side Potential: Transitioning to a server-side implementation would provide several benefits, including obfuscating API keys and improving performance by reducing the time to first paint. This would involve routing to /transaction/[hash] and performing data fetching server-side.

### Potential optimizations

Event ABI Call Look-up: Currently, event ABI look-ups are delayed to avoid rate limits, which results in slower event data retrieval. Optimizing this process could significantly improve the user experience.

Code Splitting: By transitioning to a server-side page-based application, code splitting could be implemented. This would reduce the initial load time by serving only the necessary code for each page.

React Query: Its powerful caching system automatically stores and manages server data, eliminating the need to write complex cache invalidation logic yourself while ensuring your UI stays in sync with the server. Its intelligent cache management includes automatic background refreshes and configurable stale times, meaning your data stays fresh without unnecessary network requests. The cache can be easily prefetched, invalidated, or updated optimistically, giving you fine-grained control while maintaining excellent performance.

### Short cuts

Trace Call Data: Initially, there was no access to trace call data. The solution involved fetching logs, obtaining the necessary ABI, and decoding the data. However, matching the logs to the corresponding calls was not fully resolved. This approach was taken to ship the initial version while continuing to research a more robust solution.

Mobile Styling: The application is primarily designed for desktop use. Some quick mobile styling was implemented, but it requires further refinement to provide a better mobile experience.
