import { Box, Divider, Paper, Typography } from "@mui/material"

const Footer = () => {
    return (
        <>
        <Box mt={3}>
            <Divider />
            <Box mt={3} p={2}>
                <Typography variant="subtitle2">
                Copyright © Jung Dahun All Rights Reserved.
                </Typography>
            </Box>
        </Box>
        </>
    )
}

export default Footer