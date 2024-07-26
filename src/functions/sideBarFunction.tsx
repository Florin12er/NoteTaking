import { motion } from "framer-motion";
import { FilePlus, Home, SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Actions() {
  const [areActionsCollapsed, setAreActionsCollapsed] = useState(false);

  const toggleActionsCollapse = () => {
    setAreActionsCollapsed(!areActionsCollapsed);
  };

  return (
    <div className="mt-10 text-xl">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <p
          onClick={toggleActionsCollapse}
          className="flex gap-2 text-2xl text-muted-foreground hover:text-primary px-4 py-2 cursor-pointer"
        >
          <FilePlus />
          Action Items
        </p>
      </motion.div>
      {!areActionsCollapsed && (
        <div className="mt-2 pl-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link className="flex gap-2" to="/note/new">
              <SquarePlus />
              New Note
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link className="flex gap-2" to="/note">
              <Home />
              Home
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export { Actions };

