"use client"
import React from "react";
import { api } from "~/trpc/react"

export const Testing = () => {
    const [userId, setUserId] = React.useState<string | null>(null);
    const query = api.account.getProviderByEmail.useQuery(userId || "", {
        enabled: !!userId,
    });

    const handleSubmit = (data: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(data.currentTarget);
        const userId = formData.get("userId") as string;
        setUserId(userId);
    }

    React.useEffect(() => {
        if (query.data) {
            console.log(query.data);
        }
    }, [query.data]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}
        >
            <input type="text" name="userId" />
            <button type="submit">Submit</button>
        </form>
    );
}