const AllowProvider = {
    'google':true,
    'github':true,
    'facebook':true,
}
export default function getAllowProvider(provider){
    return AllowProvider[provider];
}

