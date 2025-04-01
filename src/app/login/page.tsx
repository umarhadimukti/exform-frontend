"use client";

import React from 'react'
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    };

    return (
        <div className='min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
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
                                    <Input placeholder="type your password.." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className='cursor-pointer'>Login</Button>
                        </form>
                    </Form>
                </div>
            </main>
        </div>
    )
}

export default Login