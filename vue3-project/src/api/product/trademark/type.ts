// 定义品牌相关的类型

// 返回所有数据类型的父类型
interface responseInt {
    code: number,
    message: string,
    ok: boolean
}

export interface Records {
    id?: number,
    tmName: string,
    logoUrl: string
}

// records中的数据类型
export type recordsData = Records[];

// 返回品牌接口data中的类型
export interface responseData extends responseInt {
    data: {
        records: recordsData,
        "total": number,
        "size": number,
        "current": number,
        "searchCount": boolean,
        "pages": number
    }
}