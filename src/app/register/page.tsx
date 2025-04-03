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
import Image from 'next/image'
import Link from 'next/link'
import { useMutation } from "@tanstack/react-query"

import { ResponseRegister, User } from '@/types/registerTypes';
import { useRouter } from 'next/navigation';

// define validation rule for form schema
const formSchema = z.object({
    first_name: z.string().min(3, 'firstname at least 3 characters'),
    last_name: z.string().optional(),
    email: z.string().email('must be valid email address.'),
    password: z.string({
        message: 'password is required.'
    }).min(6, 'password at least 6 characters'),
    role_id: z.number().min(1, 'role id at least greater than equal to 1.').max(5, 'role id at least less than equal to 5.'),
});

// fetching data post users
const responseRegisterUser = async (user: User) => {
    const response = await fetch('http://localhost:3002/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok || !data.status) throw new Error(data.message || 'registration failed.');

    return data;
}

const Register: React.FC = () => {
    const router = useRouter();
    const [ error, setError ] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role_id: 3,
        },
    });

    // mutation (react query) for http post register
    const registerMutation = useMutation<ResponseRegister, Error, User>({
        mutationFn: responseRegisterUser, // function for fetching api. normally: (POST, PUT, DELETE)
        onSuccess: (data) => { // callback when mutation function is successfully executed
            if (data.accessToken) {
                localStorage.setItem('access_token', data.accessToken);
                router.push('/forms');
            } else {
                throw new Error('access token not found in response.');
            }
        },
        onError: (error) => { // error handling when mutation function failed to execute.
            setError(error instanceof Error ? error.message: error);
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            registerMutation.mutate(values as User); // execute mutation
        } catch (error) {
            console.error(error instanceof Error ? error.message : error);
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
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>first name</FormLabel>
                                <FormControl>
                                    <Input placeholder="type your firstname.." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>last name</FormLabel>
                                <FormControl>
                                    <Input placeholder="type your lastname.." {...field} />
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
                                    <Input type="password" placeholder="type your password.." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <input type="number" hidden {...form.register('role_id')} />
                            <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
                                <Button type="submit" className='cursor-pointer'>Register</Button>
                                <div className='text-sm tracking-wide'>
                                    <span>have an account? <Link href='/login' className='text-indigo-600 hover:text-indigo-800 transition-all hover:underline'>login here</Link></span>
                                </div>
                            </div>

                            { error && (
                                <div className='mt-3 text-red-600 text-sm tracking-wide'>
                                    {error.substring(error.indexOf('invalid'))}
                                </div>
                            ) }
                        </form>
                    </Form>
                </div>
            </main>
        </div>
    )
}

export default Register