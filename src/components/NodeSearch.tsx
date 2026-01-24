import { useCallback, useState, useEffect, useRef } from "react";

import {
  useReactFlow,
  type Node,
  type PanelProps,
} from "@xyflow/react";
 
export interface NodeSearchProps extends Omit<PanelProps, "children"> {
  // The function to search for nodes, should return an array of nodes that match the search string
  // By default, it will check for lowercase string inclusion.
  onSearch?: (searchString: string) => Node[];
  // The function to select a node, should set the node as selected and fit the view to the node
  // By default, it will set the node as selected and fit the view to the node.
  onSelectNode?: (node: Node) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
 
export function NodeSearchInternal({
  className,
  onSearch,
  onSelectNode,
  open,
  onOpenChange,
  ...props
}: NodeSearchProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [searchResults, setSearchResults] = useState<Node[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const { getNodes, fitView, setNodes } = useReactFlow<Node>();
 
  const defaultOnSearch = useCallback(
    (searchString: string) => {
      const nodes = getNodes();
      const needle = searchString.toLowerCase();
      return nodes.filter((node) => {
        const data = node.data as any;
        const label =
          (data && (data.label || data.name || data.title)) ||
          JSON.stringify(data) ||
          "";
        return String(label).toLowerCase().includes(needle) ||
          String(node.id).toLowerCase().includes(needle);
      });
    },
    [getNodes],
  );
 
  const onChange = useCallback(
    (searchString: string) => {
      const trimmed = String(searchString || "").trim();
      setSearchString(searchString);
      if (trimmed.length > 0) {
        onOpenChange?.(true);
        const results = (onSearch || defaultOnSearch)(searchString);
        setSearchResults(results);
      } else {
        // hide dialog when search is cleared
        setSearchResults([]);
        onOpenChange?.(false);
      }
    },
    [onSearch, onOpenChange],
  );

  // Close when clicking outside the component
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (!open) return;
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        onOpenChange?.(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open, onOpenChange]);

  // Clear results and input when the dialog is closed (including outside clicks)
  useEffect(() => {
    if (!open) {
      setSearchResults([]);
      // don't clear the searchString if you want it preserved; clear for now
      setSearchString("");
    }
  }, [open]);
 
  const defaultOnSelectNode = useCallback(
    (node: Node) => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
      );
      fitView({ nodes: [node], duration: 500 });
    },
    [fitView, setNodes],
  );
 
  const onSelect = useCallback(
    (node: Node) => {
      (onSelectNode || defaultOnSelectNode)?.(node);
      setSearchString("");
      onOpenChange?.(false);
    },
    [onSelectNode, defaultOnSelectNode, onOpenChange],
  );
 
  return (
    <div ref={rootRef} className={className} {...props}>
      <input
        aria-label="Search nodes"
        placeholder="Search nodes..."
        value={searchString}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => onOpenChange?.(true)}
        className="input input-bordered w-full text-base-content"
      />

      {open && (
        <div className="mt-2 w-full">
          {searchResults.length > 0 ? (
            <div className="card bg-base-100 shadow">
              <ul className="menu menu-compact w-full">
                {searchResults.map((node) => {
                  const data = node.data as any;
                  const displayLabel = data?.label || data?.name || data?.title || node.id;
                  return (
                    <li key={node.id}>
                      <a
                        role="button"
                        onClick={() => onSelect(node)}
                        className="justify-start text-base-content"
                      >
                        {displayLabel}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            // only show "no results" when the user has typed something
            String(searchString || "").trim().length > 0 && (
              <div className="card bg-base-100 shadow">
                <div className="card-body py-3 px-4">
                  <p className="text-sm text-base-content">No results found.</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
 
export function NodeSearch({
  className,
  onSearch,
  onSelectNode,
  ...props
}: NodeSearchProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg shadow-sm md:min-w-[450px] p-2">
      <NodeSearchInternal
        className={className}
        onSearch={onSearch}
        onSelectNode={onSelectNode}
        open={open}
        onOpenChange={setOpen}
        {...props}
      />
    </div>
  );
}
 
export interface NodeSearchDialogProps extends NodeSearchProps {
  title?: string;
}
 
export function NodeSearchDialog({
  className,
  onSearch,
  onSelectNode,
  open,
  onOpenChange,
  title = "Node Search",
  ...props
}: NodeSearchDialogProps) {
  return (
    <div className={open ? "modal modal-open" : "modal"}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-2">
          <NodeSearchInternal
            className={className}
            onSearch={onSearch}
            onSelectNode={onSelectNode}
            open={open}
            onOpenChange={onOpenChange}
            {...props}
          />
        </div>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={() => onOpenChange?.(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}