import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, FileUp, Trash2, Eye, MessageSquare, Flag, Bot, Clock, Hash, ArrowRightCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { memo } from 'react';
import { SectionCard } from '@/components/ui/section-card';

interface HistoryCardProps {
  id: string;
  conversationId: string;
  model: string;
  title: string;
  summary: string;
  tags: string[];
  timestamp: number;
  fullTimestamp: string;
  isImportant?: boolean;
  isFavorite?: boolean;
  messageCount: number;
  lastMessage: string;
  createdAt: number;
  updatedAt: number;
  isSelected?: boolean;
  onSelectChange?: (id: string, selected: boolean) => void;
  onToggleImportant?: (id: string) => void;
  onView?: (id: string) => void;
  onContinue?: (id: string) => void;
  onDelete?: (id: string) => void;
  onExport?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

// 优化的紧凑型历史卡片组件 - 使用 memo 优化性能
const HistoryCard = memo(function HistoryCard({
  id,
  model,
  title,
  summary,
  tags,
  timestamp,
  fullTimestamp,
  isImportant = false,
  isFavorite = false,
  messageCount,
  isSelected = false,
  onSelectChange,
  onToggleImportant,
  onView,
  onContinue,
  onDelete,
  onExport,
  onToggleFavorite,
}: HistoryCardProps) {
  
  // 格式化时间显示 - 更紧凑的格式
  const formatCompactTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}分钟前`;
    } else if (diffInMinutes < 1440) { // 24小时
      return `${Math.floor(diffInMinutes / 60)}小时前`;
    } else {
      return format(date, 'MM-dd');
    }
  };

  // 获取模型显示颜色
  const getModelColor = (modelName: string) => {
    if (modelName.toLowerCase().includes('gpt-4')) return 'text-green-600 bg-green-50 dark:text-green-300 dark:bg-green-800/40';
    if (modelName.toLowerCase().includes('gpt-3.5')) return 'text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-800/40';
    if (modelName.toLowerCase().includes('claude')) return 'text-purple-600 bg-purple-50 dark:text-purple-300 dark:bg-purple-800/40';
    return 'text-gray-600 bg-gray-50 dark:text-gray-300 dark:bg-slate-800/40';
  };

  // 截取摘要文本
  const truncatedSummary = summary.length > 80 ? summary.substring(0, 80) + '...' : summary;

  return (
    <SectionCard
      selected={isSelected}
      className={cn(
        "history-card-hover will-change-transform",
        isImportant && "border-l-4 border-red-500"
      )}
    >
      <div className="px-3 py-2.5">
        {/* 头部：选择框、标题、时间 */}
        <div className="flex items-start gap-3 mb-2">
          <div className="flex items-center gap-2 pt-0.5">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectChange?.(id, !!checked)}
              className="h-4 w-4 transition-all duration-150"
            />
            {/* 重要和收藏状态始终可见 */}
            <div className="flex items-center gap-1">
              {isImportant && (
                <Flag className="h-3 w-3 text-red-500 history-status-icon" />
              )}
              {isFavorite && (
                <Star className="h-3 w-3 text-yellow-500 fill-current history-status-icon" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className={cn(
                "font-medium text-sm text-gray-900 dark:text-gray-100 cursor-pointer transition-colors duration-150 truncate hover:text-blue-600 dark:hover:text-blue-400"
              )}
                onClick={() => onView?.(id)}
                title={title}>
                {title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
                <Clock className="h-3 w-3" />
                <span title={fullTimestamp} className="font-medium">
                  {formatCompactTime(timestamp)}
                </span>
              </div>
            </div>
            
            {/* 摘要 - 改进显示 */}
            <p className="text-xs text-gray-600 dark:text-gray-400 text-truncate-2 mb-2 leading-relaxed" title={summary}>
              {truncatedSummary}
            </p>
          </div>
        </div>

        {/* 信息行：模型、消息数、标签、操作按钮 */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 模型 */}
            <span className={cn(
              "px-1.5 py-0.5 rounded text-xs font-medium transition-all duration-150",
              getModelColor(model)
            )}>
              {model}
            </span>
            
            {/* 消息数 */}
            <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <Hash className="h-3 w-3" />
              <span className="font-medium">{messageCount}</span>
            </div>
            
            {/* 标签 - 最多显示2个 */}
            {tags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="h-5 text-xs px-1.5 history-tag"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <span className="text-gray-400 text-xs">+{tags.length - 2}</span>
            )}
          </div>

          {/* 操作按钮 - 简化并始终显示主要按钮 */}
          <div className="flex items-center gap-1">
            {/* 隐藏的管理按钮（悬浮显示） */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-yellow-500 transition-all duration-150 cursor-pointer"
                onClick={() => onToggleFavorite?.(id)}
                title={isFavorite ? "取消收藏" : "收藏"}
              >
                <Star className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-red-500 transition-all duration-150 cursor-pointer"
                onClick={() => onToggleImportant?.(id)}
                title={isImportant ? "取消重要" : "标记重要"}
              >
                <Flag className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all duration-150 cursor-pointer"
                onClick={() => onExport?.(id)}
                title="导出"
              >
                <FileUp className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray-400 hover:text-red-500 transition-all duration-150 cursor-pointer"
                onClick={() => onDelete?.(id)}
                title="删除"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              
              <div className="w-px h-4 bg-gray-200 mx-1" />
            </div>
            
            {/* 主要操作按钮 - 始终可见 */}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-500 hover:text-blue-500 transition-all duration-150 cursor-pointer"
              onClick={() => onView?.(id)}
              title="查看"
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-blue-500 hover:text-blue-600 transition-all duration-150 cursor-pointer"
              onClick={() => onContinue?.(id)}
              title="继续"
            >
              <ArrowRightCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </SectionCard>
  );
});

export default HistoryCard; 