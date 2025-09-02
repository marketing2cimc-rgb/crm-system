"use client";

interface CardProps {
  title: string;
  value: string | number;
  description?: string;
  children?: React.ReactNode; // ✅ 添加 children
}

export const Card = ({ title, value, description, children}: CardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {description && <p className="text-xs text-gray-400">{description}</p>}
	  <div>{children}</div>
    </div>
  );
};
