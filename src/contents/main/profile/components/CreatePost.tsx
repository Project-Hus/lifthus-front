import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { RepContent } from "../../../../api/interfaces/repsApi.interface";
import { Text, Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Input, Menu, MenuButton, useDisclosure, MenuList, MenuItem, Textarea } from "@chakra-ui/react";
import RepsApi from "../../../../api/repsApi"
import useUserStore from "../../../../store/user.zustand";
import { CloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import { ThemeColor } from "../../../../common/styles/theme.style";
import { Image } from "@chakra-ui/image";
let counter = 100;
const CreatePost = () => {
    //call user_id from zustand
    const { user_id, username } = useUserStore();
    // comment_obj의 refeching을 위해서 useQueryClient 객체 생성
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, watch } = useForm<FormData>();

    const { getButtonProps, getDisclosureProps, onOpen, onClose } = useDisclosure();
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

    // useRef를 이용해 input태그에 접근한다.
    const imageInput = useRef<HTMLInputElement>(null);
    // 버튼클릭시 input태그에 클릭이벤트를 걸어준다. 
    const onCickImageUpload = () => {
        imageInput.current?.click();
    };
    //이미지 미리보기
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const image = watch("image");
    const onLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target?.files;
        console.log(files)

        let urlList = [];
        if (files) {
            const fileList = Array.from(files)
            for (const url of fileList) {
                urlList.push(URL.createObjectURL(url))
            }
            setImagePreview(urlList);
        }


    }


    const onSubmit = async (data: FormData) => {
        if (data.text.length == 0) return alert("내용을 입력해주세요"
        );

        try {

            const rep = {
                rep_id: counter++,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: user_id,
                username: username,
                image_srcs: imagePreview,
                text: data.text,

            }
            await mutate(rep);
            setImagePreview([]);
            reset();
            onClose();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card size="sm"
                bgColor={ThemeColor.backgroundColorDarker}
                color="white"
                fontSize="0.7em"
                margin="0.5em"
                marginBottom={"0em"}
            >
                <CardHeader paddingBottom="0.5">
                    <Flex letterSpacing="4">
                        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                            <Avatar
                                name={username}
                                src={USER_PROFILE_IMAGE_ROUTE + username + ".jpeg"}
                            />
                            <Box>
                                <Heading fontSize="1.1em">{username}</Heading>
                                <Text fontSize={"0.9em"} color="gray.400"></Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: ThemeColor.backgroundColor,
                        borderLeft: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
                        borderRight: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
                    }}
                >
                    {imagePreview.length != 0 && imagePreview.map((src) => <Image src={src} objectFit="contain" maxH={"50vh"} alt="rep's imagefile" />)}
                    {imagePreview.length > 0 && <Button onClick={() => setImagePreview([])}><CloseIcon /></Button>}
                </div>

                <CardBody paddingTop="0.5em">

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Textarea placeholder="write the text" color="black" {...register("text")} backgroundColor="white" />
                        <Flex flexDirection={"row"} justifyContent="space-between">
                            <div>
                                <Button onClick={onCickImageUpload}><Input type="file" accept='image/*' {...register("image")} ref={imageInput} display="none" onChange={onLoadFile} /><PlusSquareIcon /></Button>
                                <Button>share routine</Button>
                            </div>
                            <Button margin-left="auto" type="submit" disabled={isLoading} display="inline">
                                {isLoading ? "Posting..." : "Post"}
                            </Button>
                        </Flex>





                    </form>


                </CardBody>

            </Card>


        </>
    );
};

export default CreatePost;
