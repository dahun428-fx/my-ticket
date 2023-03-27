const AllowProvider = {
    'google':true,
    'github':true,
}
export default function getAllowProvider(provider){
    return AllowProvider[provider];
}

