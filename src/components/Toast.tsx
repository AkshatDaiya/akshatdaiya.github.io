import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  visible: boolean;
  message: string;
}

const Toast = ({ visible, message }: ToastProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            fixed bottom-6 left-1/2 -translate-x-1/2 z-100
            flex items-center gap-2
            rounded-full
            bg-slate-900 text-slate-100
            px-4 py-2
            text-sm font-medium
            shadow-lg
            dark:bg-slate-800
          "
          role="status"
          aria-live="polite"
        >
          {/* subtle success dot */}
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
