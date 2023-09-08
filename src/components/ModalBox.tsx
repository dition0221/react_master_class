import React, { useState } from "react";

// * 모달박스를 통해 새로운 Board를 생성함

function ModalBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // TODO : 모달박스 만들기
    <div>
      <button onClick={openModal}>Modal</button>
    </div>
  );
}

export default React.memo(ModalBox);
