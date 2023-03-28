const AllowProvider = {
    'google':true,
    'github':true,
    'facebook':true,
    'kakao':true,
    'naver':true,
}
export default function getAllowProvider(provider){
    return AllowProvider[provider];
}

