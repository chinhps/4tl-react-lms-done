import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { GoogleIcon } from './ProviderIcon';
const providers = [
    {
        name: 'Google',
        icon: <GoogleIcon boxSize="5" />,
    },
];

export const OAuthButtonGroup = () => (
    <ButtonGroup variant="outline" spacing="4" width="full">
        {providers.map(({ name, icon }) => (
            <Button key={name} width="full">
                <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                {icon}
            </Button>
        ))}
    </ButtonGroup>
);
