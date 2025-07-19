import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    
    console.log('Message sent successfully!');
    toast.success("Message Sent Successfully!")
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
            <span className="text-gradient-aurora animate-aurora">Let's Connect</span>
          </h2>
          <p className="text-xl text-foreground-muted font-mono">
            <span className="text-primary">{'<'}</span>
            Ready to build something extraordinary together?
            <span className="text-primary">{' />'}</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 glass rounded-full flex items-center justify-center shadow-glow-xl"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center"
                  >
                    <span className="text-2xl font-black text-primary-foreground">P</span>
                  </motion.div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gradient-primary">Priyansh Narang</h3>
                    <p className="text-sm text-foreground-muted font-mono">Full Stack Developer</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <motion.a
                      href="mailto:priyansh@example.com"
                      className="block text-primary hover:text-primary-glow transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      priyansh@example.com
                    </motion.a>
                    <motion.a
                      href="tel:+1234567890"
                      className="block text-secondary hover:text-secondary-glow transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      +91 1234567890
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 border-2 border-primary/20 rounded-full scale-${110 + i * 15} pointer-events-none`}
                />
              ))}

            
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground-muted font-mono">
                  Name
                </label>
                <motion.div
                  animate={{
                    boxShadow: activeField === 'name' 
                      ? "0 0 20px hsl(var(--primary) / 0.3)" 
                      : "0 0 0px hsl(var(--primary) / 0)"
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-4 py-3 glass glass-hover rounded-xl text-foreground placeholder:text-foreground-dim focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all-normal"
                    placeholder="Your full name"
                    required
                  />
                  {activeField === 'name' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </motion.div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground-muted font-mono">
                  Email
                </label>
                <motion.div
                  animate={{
                    boxShadow: activeField === 'email' 
                      ? "0 0 20px hsl(var(--secondary) / 0.3)" 
                      : "0 0 0px hsl(var(--secondary) / 0)"
                  }}
                  className="relative"
                >
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-4 py-3 glass glass-hover rounded-xl text-foreground placeholder:text-foreground-dim focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all-normal"
                    placeholder="your@email.com"
                    required
                  />
                  {activeField === 'email' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-secondary rounded-full"
                    />
                  )}
                </motion.div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground-muted font-mono">
                  Message
                </label>
                <motion.div
                  animate={{
                    boxShadow: activeField === 'message' 
                      ? "0 0 20px hsl(var(--accent-glow) / 0.3)" 
                      : "0 0 0px hsl(var(--accent-glow) / 0)"
                  }}
                  className="relative"
                >
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    className="w-full px-4 py-3 glass glass-hover rounded-xl text-foreground placeholder:text-foreground-dim focus:outline-none focus:ring-2 focus:ring-accent-glow/50 transition-all-normal resize-none"
                    placeholder="Tell me about your project idea..."
                    rows={4}
                    required
                  />
                  {activeField === 'message' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-3 w-2 h-2 bg-accent-glow rounded-full"
                    />
                  )}
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 px-8 rounded-xl font-semibold text-lg transition-all-normal hover:shadow-glow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>Send Message</span>
                )}
                
                {!isSubmitting && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-white rounded-xl"
                  />
                )}
              </motion.button>
            </form>

            <div className="pt-8 border-t border-glass-border">
              <p className="text-sm text-foreground-muted font-mono mb-4">Or connect with me on:</p>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', icon: <Github/>, link: '#' },
                  { name: 'LinkedIn', icon: <Linkedin/>, link: '#' },
                  { name: 'Twitter', icon: <Twitter/>, link: '#' },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    className="w-12 h-12 glass glass-hover rounded-xl flex items-center justify-center transition-all-normal"
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
};