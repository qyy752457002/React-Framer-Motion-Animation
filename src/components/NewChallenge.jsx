import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

// 创建一个新挑战组件，接收一个onDone函数作为参数
export default function NewChallenge({ onDone }) {
  // 使用useRef创建引用，用于获取输入字段的值
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  // 使用useState管理选中的图片状态
  const [selectedImage, setSelectedImage] = useState(null);
  // 使用useContext获取挑战的上下文
  const { addChallenge } = useContext(ChallengesContext);

  // 处理图片选择的函数
  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  // 提交表单时的处理函数
  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    // 检查所有输入字段是否有内容，以及是否已选择图片
    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      // 如果输入字段或图片未选择，则使用Framer Motion的animate函数显示错误提示
      // input 对应 下面 Model组件 里面 form 子节点 input: ex. input ref={title} type="text" name="title" id="title" />
      // textarea 对应 下面 Model组件 里面 form 子节点 textarea: ex. <textarea ref={description} name="description" id="description" />
      animate('input, textarea', { x: [-10, 0, 10, 0] }, { type: 'spring', duration: 0.2, delay: stagger(0.05) } ); 
      return;
    }

    // 调用完成函数和添加挑战函数
    onDone();
    addChallenge(challenge);
  }

  // 渲染模态框组件，包含表单用于输入新挑战的详细信息
  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul 
          id="new-challenge-images"
          variants={{
            visible: { transition: { staggerChildren: 0.05} } // 每个子元素之间有0.05秒的延迟
          }}
          // initial 继承 父组件 Model 里面 的 initial= "hidden"
          // animate 继承 父组件 Model 里面 的 animate= "visible"，但是用当前variants里面的visible重写
          // exit 继承 父组件 Model 里面 的 exit= "hidden"
          >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 }, // 透明度为 0，scale为0.5
                visible: { opacity: 1, scale: [0.8, 1.3, 1] }, // 透明度从 0 到 1，scale从 0.8 到 1.3 再到 1
              }}
              // initial 继承 父元素 motion.li 里面 的 initial= "hidden"，但是用当前variants里面的hidden重写
              // animate 继承 父元素 motion.li 里面 的 animate= "visible"，但是用当前variants里面的visible重写
              exit = {{ opacity: 1, scale: 1 }} // 透明度为 1，scale为1
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
