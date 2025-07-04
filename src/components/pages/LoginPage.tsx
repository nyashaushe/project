'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '../../contexts/ToastContext';
import { login } from '../../services/api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('../ui/Button'), { ssr: false });

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { user, jwt } = await login(data.email, data.password);
      dispatch(setUser({ user, token: jwt }));
      showToast('Logged in successfully!', 'success');
      router.push('/');
    } catch {
      showToast('Login failed. Please check your credentials.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginPage;
