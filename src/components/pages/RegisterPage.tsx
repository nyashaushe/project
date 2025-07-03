
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '../../contexts/ToastContext';
import Button from '../ui/Button';
import { register as registerUser } from '../../services/api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/authSlice';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const { user, jwt } = await registerUser(data.username, data.email, data.password);
      dispatch(setUser({ user, token: jwt }));
      showToast('Registered successfully!', 'success');
      router.push('/');
    } catch {
      showToast('Registration failed. Please try again.', 'error');
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
          <h2 className="text-3xl font-bold text-white text-center mb-8">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                {...register('username')}
                placeholder="Username"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              />
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
            </div>
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
            <div>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterPage;
