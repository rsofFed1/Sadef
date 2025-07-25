import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createLead } from "@/lib/api";
import { leadSchema, leadForm } from "@/app/validators/createLead";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";

interface InquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: number;
}

export function InquiryModal({ open, onOpenChange, propertyId }: InquiryModalProps) {
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<leadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      propertyId: propertyId,
    },
  });

  useEffect(() => {
    setValue("propertyId", propertyId);
  }, [propertyId, setValue]);

  const onSubmit = async (data: leadForm) => {
    const res = await createLead(data);
    if (res.succeeded) {
      setSuccess(res.message || "Inquiry submitted successfully.");
      reset({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        propertyId: propertyId,
      });
    }
  };

  useEffect(() => {
    if (!open) setSuccess(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inquiry Sent!</h3>
              <p className="text-sm text-gray-500 mb-6">{success}</p>
              <Button 
                onClick={() => onOpenChange(false)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
                <DialogHeader className="text-left">
                  <DialogTitle className="text-white flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Property Inquiry
                  </DialogTitle>
                  <DialogDescription className="text-blue-100">
                    Fill out the form below to inquire about this property.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register("fullName")} className="mt-1" />
                  {errors.fullName && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.fullName.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} className="mt-1" />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register("phone")} className="mt-1" />
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.phone.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    {...register("message")} 
                    className="mt-1 min-h-[100px]"
                    placeholder="Tell us more about your interest in this property..."
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-600 text-sm mt-1"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                <input type="hidden" {...register("propertyId", { value: propertyId })} />

                <DialogFooter className="mt-6">
                    <motion.div
                        className="flex gap-3 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1  bg-primary hover:bg-primary-hover text-bg-main p-2 border-1 rounded-md"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                                </span>
                            ) : "Submit Inquiry"}
                        </motion.button>
                        <DialogClose asChild>
                        <motion.button
                            type="button"
                            className="flex-1  bg-primary hover:bg-primary-hover text-bg-main p-2 border-1 rounded-md"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Close
                        </motion.button>
                        </DialogClose>
                    </motion.div>
                </DialogFooter>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}