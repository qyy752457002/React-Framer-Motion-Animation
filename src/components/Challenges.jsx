import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // 引入动画库

import { ChallengesContext } from '../store/challenges-context.jsx'; // 引入挑战上下文
import ChallengeItem from './ChallengeItem.jsx'; // 引入挑战项组件
import ChallengeTabs from './ChallengeTabs.jsx'; // 引入挑战选项卡组件

export default function Challenges() {
  // 使用挑战上下文
  const { challenges } = useContext(ChallengesContext);
  // 状态：选定的挑战类型，默认为'active'
  const [selectedType, setSelectedType] = useState('active');
  // 状态：当前展开的挑战项ID，初始值为null
  const [expanded, setExpanded] = useState(null);

  // 处理选定的挑战类型
  function handleSelectType(newType) {
    setSelectedType(newType);
  }

  // 处理查看挑战详情
  function handleViewDetails(id) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null; // 如果当前展开的挑战项与点击的相同，则关闭
      }
      return id; // 否则展开点击的挑战项
    });
  }

  // 根据选定类型过滤挑战
  const filteredChallenges = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter((challenge) => challenge.status === 'completed'),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  // 获取当前显示的挑战列表
  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      {/* 挑战选项卡组件 */}
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {/* 动画包裹 */}
        <AnimatePresence mode="wait">
          {/* 如果有挑战项 */}
          {displayedChallenges.length > 0 && (
            // 挑战项列表
            <motion.ol
              key="list"
              initial={{ opacity: 0, y: -100 }} // 初始状态下，列表 ChallengeItem 的透明度为0（完全透明），并且垂直偏移为-100px（向上偏移100像素）
              animate={{ opacity: 1, y: 0 }} // 动画的目标状态，列表 ChallengeItem 的透明度为1（完全不透明），并且垂直偏移为0（不偏移）
              exit={{ opacity: 0, y: -100 }} // 动画退出时的状态，列表 ChallengeItem 的透明度为0（完全透明），并且垂直偏移为-100px（向上偏移100像素）
              className="challenge-items"
            >
              {/* 遍历显示挑战项 */}
              <AnimatePresence>
                {displayedChallenges.map((challenge) => (
                  <ChallengeItem
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={() => handleViewDetails(challenge.id)}
                    isExpanded={expanded === challenge.id} // 是否展开当前项
                  />
                ))}
              </AnimatePresence>
            </motion.ol>
          )}
          {/* 如果没有挑战项 */}
          {displayedChallenges.length === 0 && (
            // 提示没有挑战项
            <motion.p
              key="fallback"
              initial={{ opacity: 0, y: -100 }} // 初始状态下，文本的透明度为0（完全透明），并且垂直偏移为-100px（向上偏移100像素）
              animate={{ opacity: 1, y: 0}} // 动画的目标状态，文本的透明度为1（完全不透明），并且垂直偏移为0（不偏移）
              exit={{ opacity: 0, y: -100 }} // 动画退出时的状态，文本的透明度为0（完全透明），并且垂直偏移为-100px（向上偏移100像素）
            >
              No challenges found.
            </motion.p>
          )}
        </AnimatePresence>
      </ChallengeTabs>
    </div>
  );
}

/*
  这个动画效果会使 列表 ChallengeItem 从初始状态开始，向下偏移100像素并逐渐变得不透明，最终停留在页面上方。
  当 列表 ChallengeItem 退出时，它会沿垂直方向向上偏移100像素并逐渐变得透明。
*/

/*
  这个动画效果会使 文本 No challenges found 从初始状态开始，向下偏移100像素并逐渐变得不透明，最终停留在页面上方。
  当文本 No challenges found 退出时，它会沿垂直方向向上偏移100像素并逐渐变得透明。
*/
