import React from 'react'
import { Group, Text, useMantineTheme, Container } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';

export function Page(props: Partial<DropzoneProps>) {
    const theme = useMantineTheme();
    return (
        <Container size='xs'>
            <h1>
                Register
            </h1>
            <p>
                In order to register you need to provide a public key. This public key will be used to verify your identity.
                The public key should be <a style={{ color: theme.colors.blue[0], textDecoration: 'underline' }} href='https://www.ssl.com/guide/pem-der-crt-and-cer-x-509-encodings-and-conversions/'>PEM encoded</a> and generated with a size of 2048 bits.
                You can download a tool to help you generate a key-pair on <a style={{ color: theme.colors.blue[0], textDecoration: 'underline' }} href='https://gitlab.gwdg.de/v.mattfeld/asteroid-server'>
                    this site</a> or <a style={{ color: theme.colors.blue[0], textDecoration: 'underline' }} href='https://travistidwell.com/jsencrypt/demo/'>do it yourself</a>.
            </p>
            <p>
                Because it is important, here it is again:<br />
                The keypair should have the following requirements:
                <ul>
                    <li>RSA</li>
                    <li>PEM encoded</li>
                    <li>2048 bit size</li>
                </ul>
            </p>
            <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
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
        </Container>
    );
}