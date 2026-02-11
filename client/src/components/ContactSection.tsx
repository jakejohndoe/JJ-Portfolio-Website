import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, Mail, User, MessageSquare } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required").max(1000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Sanitize input data
      const sanitizedData = {
        name: data.name.trim().replace(/<[^>]*>?/gm, ''),
        email: data.email.trim().toLowerCase(),
        subject: data.subject?.trim().replace(/<[^>]*>?/gm, '') || '',
        message: data.message.trim().replace(/<[^>]*>?/gm, ''),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
        redirect: 'follow', // Handle redirects properly
      });

      // Handle response - check if it's JSON
      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // If not JSON, likely an error page or redirect issue
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response. Please try again.');
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to send message');
      }

      // Check if email was sent successfully
      if (responseData.emailSent === false && responseData.warning) {
        toast({
          title: "Message saved with warning",
          description: responseData.message || "Your message was saved but the email notification failed. I'll still see your message.",
          variant: "default",
        });
      } else if (responseData.emailSent === false) {
        toast({
          title: "Message received",
          description: responseData.message || "Your message has been saved successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "Message sent successfully!",
          description: responseData.message || "Thank you for your message. I'll get back to you soon.",
          variant: "default",
        });
      }

      setSubmitted(true);
      form.reset();

      // Keep success message visible longer
      setTimeout(() => setSubmitted(false), 7000);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again or email me directly at hellojakejohn@gmail.com',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 gradient-flow opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="font-mono text-primary text-sm mb-2">&lt;section id="contact"&gt;</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's <span className="text-gradient">Build Together</span>
            </h2>
            <p className="text-muted-foreground mb-12">
              Have a Web3 project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="glass p-8 rounded-xl">
              {submitted ? (
                <div
                  className={`p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg transform transition-all duration-500 ${
                    submitted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">✨</div>
                    <div>
                      <h4 className="font-semibold text-lg text-primary">Message sent successfully!</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Thank you for reaching out. I'll get back to you within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="name" className="flex items-center gap-2 text-foreground mb-2">
                              <User className="w-4 h-4 text-primary" />
                              Name <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="name"
                                {...field}
                                className="bg-background/50 text-foreground border-primary/20 focus:border-primary transition-colors"
                                placeholder="Your name"
                                autoComplete="name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email" className="flex items-center gap-2 text-foreground mb-2">
                              <Mail className="w-4 h-4 text-primary" />
                              Email <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                {...field}
                                className="bg-background/50 text-foreground border-primary/20 focus:border-primary transition-colors"
                                placeholder="your@email.com"
                                autoComplete="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="subject" className="flex items-center gap-2 text-foreground mb-2">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="subject"
                              {...field}
                              className="bg-background/50 text-foreground border-primary/20 focus:border-primary transition-colors"
                              placeholder="What's this about?"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="message" className="flex items-center gap-2 text-foreground mb-2">
                            <Send className="w-4 h-4 text-primary" />
                            Message <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id="message"
                              {...field}
                              rows={6}
                              className="bg-background/50 text-foreground border-primary/20 focus:border-primary transition-colors resize-none"
                              placeholder="Tell me about your project..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="enhanced-button w-full bg-primary text-primary-foreground font-mono rounded-lg py-4 px-6 hover:bg-opacity-90 transition-all relative group"
                      aria-label="Send contact form message"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Alternative contact methods */}
            <div className={`mt-8 text-center transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-muted-foreground text-sm">
                Prefer email? Reach me directly at{' '}
                <a
                  href="mailto:hellojakejohn@gmail.com"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  hellojakejohn@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className={`font-mono text-primary text-sm mt-12 text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            &lt;/section&gt;
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;