import { useEventLogs } from "@/hooks/useEventLogs";

import { useTransactionTrace } from "@/hooks/useTransactionTrace";

import { TransactionTraceViewer } from "../TransactionTraceTree /TransactionTraceTree";
import { EventLog } from "../EventLog/EventLog";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";

const InvocationFlow = ({ hash }: { hash: string }) => {
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
      {isTraceLoading ? <Loading name="trace call log" /> : null}

      {trace && !isTraceLoading && !traceError ? (
        <TransactionTraceViewer data={trace} />
      ) : null}

      {traceError ? <Error error={traceError} /> : null}

      {logs && !isEventsLoading && !logError ? <EventLog logs={logs} /> : null}

      {isEventsLoading ? <Loading name="event log" /> : null}

      {logError ? <Error error={logError} /> : null}
    </div>
  );
};

export default InvocationFlow;
