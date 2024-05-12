import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; 

import NewChallenge from './NewChallenge.jsx';

export default function Header() {
  // 定义状态来控制是否正在创建新挑战
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState(false);

  // 处理开始添加新挑战的事件
  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  // 处理完成添加新挑战的事件
  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {/* 使用 AnimatePresence 包裹以支持动画 */}
      <AnimatePresence>
        {/* 如果正在创建新挑战，则渲染 NewChallenge 组件 */}
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      {/* 页面头部 */}
      <header id="main-header">
        <h1>Your Challenges</h1>
        {/* 添加挑战按钮 */}
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: '#8b11f0' }} // 悬停时的背景色和缩放效果
          transition={{ type: 'spring', stiffness: 500 }} // 过渡效果为弹簧
          onClick={handleStartAddNewChallenge} // 点击事件处理函数
          className="button">
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}

