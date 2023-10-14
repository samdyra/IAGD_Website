import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  isModalVisible: boolean;
  handleHideModal: () => void;
  children: React.ReactNode;
  //   callback: () => void;
  modalName: string;
  y: string;
}

function Modal(props: IProps) {
  return (
    <AnimatePresence>
      {props.isModalVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Darken overlay background */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={props.handleHideModal}
          ></div>

          {/* Modal */}
          <motion.div
            className="relative z-50 flex w-11/12 flex-col rounded-lg border-0 bg-white shadow-lg sm:w-96"
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t border-b border-solid border-slate-400 px-5 pb-1 pt-2">
              <h3 className="tcs text-sm font-semibold">{props.modalName}</h3>
              <button
                className="opacity-4 float-right border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-slate-200 outline-none focus:outline-none"
                onClick={props.handleHideModal}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="relative flex-auto px-6 py-4">{props.children}</div>

            {/* Footer */}
            {/* <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-400 p-2">
              <button
                className="mb-1 rounded bg-blue-700 px-4 py-2 text-xs font-semibold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-800"
                type="button"
                onClick={props.callback}
              >
                Execute
              </button>
            </div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default memo(Modal);
