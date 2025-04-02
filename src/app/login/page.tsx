"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email('must be valid email address.'),
    password: z.string({
        message: 'password is required.'
    }).min(6, 'password at least 6 characters'),
});

const Login: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
    });

    // loading state
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // set isLoading and error
        setIsLoading(true);
        setError(null);
        try {
            // send data to server
            const response = await fetch('localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            // get data from response
            const data = response.json();

            console.log(data);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'login error occured.');
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className='min-h-screen p-8 container mx-auto pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className="min-h-[80vh] flex justify-center items-center">
                <div className="card flex flex-col w-[500px] min-h-[350px] p-10 pt-3 rounded-md shadow">
                    <div>
                        <Image src="/images/exform_logo.png" alt="logo" width={100} height={100} priority quality={100}/>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="type your email.." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input placeholder="type your password.." {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
                                <Button type="submit" className='cursor-pointer'>Login</Button>
                                <div className='text-sm tracking-wide'>
                                    <span>don't have an account? <Link href='/register' className='text-indigo-600 hover:text-indigo-800 transition-all hover:underline'>register here</Link></span>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </div>
    )
}

export default Login