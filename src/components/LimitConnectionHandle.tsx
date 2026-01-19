import { Handle, useNodeConnections } from "@xyflow/react";

const LimitConnectionHandle = (props) => {
  const { connectionCount, ...rest } = props;

  const connections = useNodeConnections({
    handleType: rest.type,
  });

  return (
    <Handle
      {...rest}
      isConnectable={connections.length < (connectionCount ?? Infinity)}
    />
  );
};

export default LimitConnectionHandle;
