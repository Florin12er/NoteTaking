import { motion } from "framer-motion"
import { FilePlus } from "lucide-react"
import { Link } from "react-router-dom"

function Actions() {
    return(
        <div className="mt-10">
            <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
                <Link to="#" className="flex gap-2 text-muted-foreground hover:text-primary px-4 py-2">
                    <FilePlus />
                Action Items
            </Link>
            </motion.div>
                <div className="mt-2 pl-6">
                    <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                        <Link to="/note/new">New Note</Link>
                    </motion.div>
                    <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                        <Link to="/note">Home</Link>
                    </motion.div>
                </div>
            </div>
    )}
export {Actions}
