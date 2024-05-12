import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

// Modal 组件用于显示一个模态框，接受标题、内容和关闭事件
export default function Modal({ title, children, onClose }) {

  return createPortal(
    // 使用 createPortal 将模态框挂载到指定的 DOM 元素上
    <>
      {/* 点击背景关闭模态框 */}
      <div className="backdrop" onClick={onClose} />
      {/* 使用 Framer Motion 的 motion.dialog 组件实现动画效果 */}
      <motion.dialog 
        variants={{
          hidden: { opacity: 0, y: -100 }, // 透明度为 0，垂直偏移为-100px（向上偏移100像素）
          visible: { opacity: 1, y: 0 } // 透明度为 1，垂直偏移为0px（不偏移）
        }}
        initial= "hidden" // 初始状态，透明度为 0，垂直偏移为-100px（向上偏移100像素）
        animate= "visible" // 动画状态，透明度为 1，垂直偏移为0px（不偏移）
        exit= "hidden" // 退出状态，透明度为 0，垂直偏移为-100px（向上偏移100像素）
        open  // 标记模态框为打开状态
        className="modal">
        {/* 模态框标题 */}
        <h2>{title}</h2>
        {/* 模态框内容 */}
        {children}
      </motion.dialog>
    </>,
    // 将模态框挂载到 id 为 'modal' 的 DOM 元素上
    document.getElementById('modal')
  );
}

/*
  这个动画效果会使 对话框 (dialog) 从初始状态开始，向下偏移100像素并逐渐变得不透明，最终停留在页面上方。
  当 对话框 (dialog) 退出时，它会沿垂直方向向上偏移100像素并逐渐变得透明。
*/
