// 从framer-motion库中导入motion组件
import { motion } from "framer-motion";

// 定义一个名为Badge的函数组件，接收一个名为caption的属性
export default function Badge({ caption }) {
  return (
    // 使用motion.span替代普通的span标签来添加动画效果
    <motion.span
      // 设置动画属性，animate属性定义了动画的具体行为
      // 这里设置scale属性，让组件从原始大小(1)放大到1.2倍，然后再缩小回原始大小
      animate={{ scale: [1, 1.2, 1] }}
      // transition属性定义动画的过渡效果
      // duration设置动画持续时间为0.3秒
      transition={{ duration: 0.3 }}
      // className设置CSS类为"badge"，用于应用相关的样式
      className="badge"
    >
      {/*将传入的caption属性值显示在span元素中*/}
      {caption}
    </motion.span>
  );
}
