import Badge from './Badge.jsx'; // 引入徽章组件
import { motion } from 'framer-motion'; // 引入动画库

// 单个选项卡组件
function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined} // 如果被选中，则添加选中样式类名
        onClick={onSelect} // 点击选项卡触发选择事件
      >
        {children} {/* 渲染选项卡标签 */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge> {/* 渲染徽章 */}
      </button>
      {/* 如果选项卡被选中，则渲染动画指示器 */}
      {isSelected && <motion.div layoutId="tab-indicator" className="active-tab-indicator" />}
    </li>
  );
}

// 挑战选项卡组件
export default function ChallengeTabs({
  selectedType, // 当前选中的挑战类型
  onSelectType, // 选择挑战类型的回调函数
  challenges, // 挑战数据
  children, // 子组件
}) {
  return (
    <>
      {/* 选项卡菜单 */}
      <menu id="tabs">
        {/* 渲染“Active”选项卡 */}
        <Tab
          isSelected={selectedType === 'active'} // 是否被选中
          onSelect={() => onSelectType('active')} // 点击选中事件
          badgeCaption={challenges.active.length} // 徽章内容：活跃挑战数量
        >
          Active {/* 选项卡标签 */}
        </Tab>
        {/* 渲染“Completed”选项卡 */}
        <Tab
          isSelected={selectedType === 'completed'} // 是否被选中
          onSelect={() => onSelectType('completed')} // 点击选中事件
          badgeCaption={challenges.completed.length} // 徽章内容：已完成挑战数量
        >
          Completed {/* 选项卡标签 */}
        </Tab>
        {/* 渲染“Failed”选项卡 */}
        <Tab
          isSelected={selectedType === 'failed'} // 是否被选中
          onSelect={() => onSelectType('failed')} // 点击选中事件
          badgeCaption={challenges.failed.length} // 徽章内容：失败挑战数量
        >
          Failed {/* 选项卡标签 */}
        </Tab>
      </menu>
      <div>{children}</div> {/* 渲染子组件 */}
    </>
  );
}

