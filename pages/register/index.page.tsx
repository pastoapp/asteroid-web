import React from 'react'
import { Group, Text, useMantineTheme, Container, Anchor } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications'

interface User {
    _id: string
    createdAt: number
    nonce: string
    notes: string
    publicKey: string
    updatedAt: number
}


const register = async (fileInput: File[]) => {
    console.log(fileInput);

    var formdata = new FormData();
    formdata.append("file", fileInput[0],);

    var requestOptions: RequestInit = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
    };

    const response = await fetch("http://localhost:3000/users/", requestOptions)

    const user: User = (await response.json()) as User;
    return user
}

export function Page(props: Partial<DropzoneProps>) {
    const theme = useMantineTheme();
    const [uid, setUid] = React.useState("");
    const [nonce, setNonce] = React.useState("");
    return (
        <Container size='xs'>
            <h1>
                Register
            </h1>
            <p>
                In order to register you need to provide a public key. This public key will be used to verify your identity.
                The public key should be <Anchor href='https://www.ssl.com/guide/pem-der-crt-and-cer-x-509-encodings-and-conversions/'>PEM encoded</Anchor> and generated with a size of 2048 bits.
                You can download a tool to help you generate a key-pair on <Anchor href='https://gitlab.gwdg.de/v.mattfeld/asteroid-server'>
                    this site</Anchor> or <Anchor href='https://travistidwell.com/jsencrypt/demo/'>do it yourself</Anchor>.
            </p>
            <p>
                Because it is important, here it is again:<br />
                The keypair should have the following requirements:
            </p>
            <ul>
                <li>RSA</li>
                <li>PEM encoded</li>
                <li>2048 bit size</li>
            </ul>
            <Dropzone
                onDrop={(files) => register(files).then(({ _id, nonce }) => { setUid(_id); setNonce(nonce) })}
                onReject={(files) => showNotification({ message: 'Invalid file type!', title: 'Error' })}
                maxSize={3 * 1024 ** 2}
                {...props}
            >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            size={50}
                            stroke={1.5}
                            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size={50}
                            stroke={1.5}
                            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={50} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag your  public key here or click to select a file in order to register.
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Optain a public key from for using this app.
                        </Text>
                    </div>
                </Group>
            </Dropzone>

            {
                uid && <h1>User ID: {uid}</h1>
            }

            {
                nonce && <h1>Nonce: {nonce}</h1>
            }
        </Container>
    );
}