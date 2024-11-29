import { useEventLogs } from "@/hooks/useEventLogs";

import { useTransactionTrace } from "@/hooks/useTransactionTrace";

import { TransactionTraceViewer } from "../TransactionTraceTree /TransactionTraceTree";
import { EventLog } from "../EventLog/EventLog";

export const InvocationFlow = ({ hash }: { hash: string }) => {
  const {
    isLoading: isEventsLoading,
    error: logError,
    logs,
  } = useEventLogs(hash);

  const {
    isLoading: isTraceLoading,
    error: traceError,
    trace,
  } = useTransactionTrace(hash);

  return (
    <div className="max-w-6xl mx-auto">
      <TransactionTraceViewer
        data={trace}
        error={traceError}
        isLoading={isTraceLoading}
      />

      <EventLog logs={logs} error={logError} isLoading={isEventsLoading} />
    </div>
  );
};
