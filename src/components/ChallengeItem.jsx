import { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion"; // 引入动画库

import { ChallengesContext } from "../store/challenges-context.jsx"; // 引入挑战上下文

export default function ChallengeItem({
  challenge,
  onViewDetails,
  isExpanded,
}) {
  const { updateChallengeStatus } = useContext(ChallengesContext); // 使用挑战上下文中的更新挑战状态函数

  // 格式化挑战截止日期
  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  // 处理取消挑战的函数
  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed"); // 调用上下文中的更新挑战状态函数，将挑战标记为失败
  }

  // 处理完成挑战的函数
  function handleComplete() {
    updateChallengeStatus(challenge.id, "completed"); // 调用上下文中的更新挑战状态函数，将挑战标记为完成
  }

  return (
    // layout 的主要作用是在动画中处理布局变化，以确保动画过渡的平滑性和自然性
    <motion.li layout exit={{ y: -30, opacity: 0 }}> {/* 应用退出动画 */}
      <article className="challenge-item">
        <header>
          <img {...challenge.image} /> {/* 渲染挑战图片 */}
          <div className="challenge-item-meta">
            <h2>{challenge.title}</h2> {/* 渲染挑战标题 */}
            <p>Complete until {formattedDate}</p> {/* 渲染挑战截止日期 */}
            <p className="challenge-item-actions">
              {/* 挑战操作按钮 */}
              <button onClick={handleCancel} className="btn-negative">
                Mark as failed
              </button> {/* 标记为失败按钮 */}
              <button onClick={handleComplete}>Mark as completed</button> {/* 标记为完成按钮 */}
            </p>
          </div>
        </header>
        <div className="challenge-item-details">
          <p>
            <button onClick={onViewDetails}> {/* 查看详情按钮 */}
              View Details{" "} 
              {/* 旋转箭头图标，根据展开状态进行动画 */}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }} 
                className="challenge-item-details-icon"
              >
                &#9650;
              </motion.span>
            </button>
          </p>

          {/* 根据展开状态渲染挑战详情 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} // 初始状态下高度为0，完全透明
                animate={{ height: "auto", opacity: 1 }} // 动画过渡到自动高度，完全不透明
                exit={{ height: 0, opacity: 0 }} // 退出时高度为0，完全透明
              >
                <p className="challenge-item-description">
                  {challenge.description} {/* 渲染挑战描述 */}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </motion.li>
  );
}
