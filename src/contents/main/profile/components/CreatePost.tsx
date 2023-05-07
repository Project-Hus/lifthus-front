import React from "react";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { RepContent } from "../../../../api/interfaces/repsApi.interface";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import RepsApi from "../../../../api/repsApi"
import useUserStore from "../../../../store/user.zustand";
const CreatePost = () => {
    //call user_id from zustand
    const { user_id, username } = useUserStore();
    // comment_obj의 refeching을 위해서 useQueryClient 객체 생성
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm<FormData>();

    const { getButtonProps, getDisclosureProps, isOpen, onOpen } = useDisclosure();
    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()

    const { mutate, isLoading } = useMutation(async (rep: RepContent) => RepsApi.post_rep({ user_id, rep }), {
        onSuccess(data, variables, context) {
            queryClient.invalidateQueries({ queryKey: ["reps"] });
        },
    });
    type FormData = {
        text: string;
        image: FileList;
    };
    const onSubmit = async (data: FormData) => {
        try {
            const rep = {
                rep_id: Math.floor(Math.random() * 1000),
                created_at: new Date(),
                updated_at: new Date(),
                user_id: user_id,
                username: username,
                text: data.text,

            }
            await mutate(rep);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button {...buttonProps}>Create new Post</Button>
            <form {...disclosureProps} onSubmit={handleSubmit(onSubmit)}>

                <Input color="black" type="text" {...register("text")} backgroundColor="white" />
                <input type="file" {...register("image")} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "작성 중..." : "작성"}
                </button>
            </form>
        </>
    );
};

export default CreatePost
