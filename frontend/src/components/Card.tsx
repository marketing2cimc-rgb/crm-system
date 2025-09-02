"use client";

import React from "react";

interface CardProps {
  /** 卡片标题 */
  title?: string;
  /** 显示的主要数值（可选） */
  value?: string | number;
  /** 辅助说明文字（可选） */
  description?: string;
  /** 子组件内容，可以是表格、图表等 */
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, value, description, children }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
      {/* 头部标题 */}
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}

      {/* 数值和描述 */}
      {value !== undefined && (
        <div className="mb-3">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      )}

      {/* 子内容区 */}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Card;
