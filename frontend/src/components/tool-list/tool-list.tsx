import React from 'react';
import ToolCard from './tool-card';

interface Props {
  tools: any[];
  selectedToolId: string | null;
  onToolSelect: (toolId: string) => void;
}

const ToolList: React.FC<Props> = ({ tools, selectedToolId, onToolSelect }) => {
  // const { tools, loading } = useSelector((state: RootState) => state.tools);

  return (
    <div>
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isSelected={selectedToolId === tool.id}
          onClick={() => onToolSelect(tool.id)}
        />
      ))}
    </div>
  );
};

export default ToolList;