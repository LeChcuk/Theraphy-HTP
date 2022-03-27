import React from 'react';
import './Table.scss';

function PrintTableRow({ array }) {
    return (
        <tr>
            <td>{array.no}</td>
            <td>{array.division}</td>
            <td>{array.item}</td>
            <td>{array.first}</td>
            <td>{array.second}</td>
            <td>{array.third}</td>
            <td>{array.fourth}</td>
            <td>{array.fifth}</td>
            <td>{array.sixth}</td>
            <td>{array.seventh}</td>
            <td>{array.eighth}</td>
            <td>{array.ninth}</td>
        </tr>
    );
}

function Table({ house }) {
    const HList = [
        {
            no: 0,
            division: '가',
            item: '가',
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 0,
            sixth: 0,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 4,
            division: '크기',
            item: '지나치게 큰 집',
            first: 1,
            second: 1,
            third: 0,
            fourth: 0,
            fifth: 0,
            sixth: 0,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 5,
            division: '크기',
            item: '지나치게 작은집',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 1,
            ninth: 1,
        },
        {
            no: 7,
            division: '위치',
            item: '좌측에 위치한 집',
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 1,
            sixth: 0,
            seventh: 1,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 8,
            division: '위치',
            item: '우측에 위치한 집',
            first: 1,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 0,
            sixth: 0,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 9,
            division: '위치',
            item: '하단에 위치한 집',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 12,
            division: '지붕',
            item: '과도하게 큰 지붕',
            first: 1,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 0,
            sixth: 1,
            seventh: 1,
            eighth: 0,
            ninth: 1,
        },
        {
            no: 13,
            division: '지붕',
            item: '과도한 지붕의 무늬 표현',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 14,
            division: '지붕',
            item: '뾰족한 지붕의 표현, 세모 지붕',
            first: 1,
            second: 1,
            third: 0,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 16,
            division: '벽돌',
            item: '허술한 벽',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 0,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 17,
            division: '벽',
            item: '지나치게 견고한 벽돌이나 벽면의 표현',
            first: 1,
            second: 1,
            third: 0,
            fourth: 1,
            fifth: 0,
            sixth: 1,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 18,
            division: '현관문',
            item: '현관문이 과하게 클 경우',
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 1,
            sixth: 0,
            seventh: 1,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 19,
            division: '현관문',
            item: '현관문이 과하게 작을 경우',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 1,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 20,
            division: '현관문',
            item: '측면의 현관문',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 22,
            division: '현관문',
            item: '현관문의 생략',
            first: 0,
            second: 1,
            third: 1,
            fourth: 1,
            fifth: 1,
            sixth: 1,
            seventh: 1,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 23,
            division: '창문',
            item: '창문의 생략',
            first: 0,
            second: 0,
            third: 0,
            fourth: 1,
            fifth: 1,
            sixth: 0,
            seventh: 0,
            eighth: 1,
            ninth: 1,
        },
        {
            no: 24,
            division: '창문',
            item: '3개 이상의 많은 창문',
            first: 0,
            second: 1,
            third: 0,
            fourth: 0,
            fifth: 0,
            sixth: 0,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 25,
            division: '창문',
            item: '커튼, 창살 등으로 가려진 창문',
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 27,
            division: '굴뚝',
            item: '굴뚝의 연기',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 0,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 28,
            division: '태양',
            item: '반만 나온 태양',
            first: 0,
            second: 0,
            third: 1,
            fourth: 0,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
        {
            no: 30,
            division: '기타',
            item: '산속이나 숲속의 집의 표현',
            first: 0,
            second: 1,
            third: 0,
            fourth: 1,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 0,
            ninth: 0,
        },
        {
            no: 31,
            division: '기타',
            item: '울타리의 표현',
            first: 0,
            second: 1,
            third: 0,
            fourth: 1,
            fifth: 1,
            sixth: 1,
            seventh: 0,
            eighth: 1,
            ninth: 0,
        },
    ];

    let pertinentList = [];
    house.forEach((ab) => {
        pertinentList.push(HList.find((abc) => abc.no === ab));
    });

    let first = 0,
        second = 0,
        third = 0,
        fourth = 0,
        fifth = 0,
        sixth = 0,
        seventh = 0,
        eighth = 0,
        ninth = 0;
    for (let i = 0; i < pertinentList.length; i++) {
        first += parseInt(`${pertinentList[i].first}`);
        second += parseInt(`${pertinentList[i].second}`);
        third += parseInt(`${pertinentList[i].third}`);
        fourth += parseInt(`${pertinentList[i].fourth}`);
        fifth += parseInt(`${pertinentList[i].fifth}`);
        sixth += parseInt(`${pertinentList[i].sixth}`);
        seventh += parseInt(`${pertinentList[i].seventh}`);
        eighth += parseInt(`${pertinentList[i].eighth}`);
        ninth += parseInt(`${pertinentList[i].ninth}`);
    }

    return (
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>구분</th>
                        <th>항목</th>
                        <th>공격성</th>
                        <th>사회불안</th>
                        <th>우울</th>
                        <th>대인회피</th>
                        <th>자존감</th>
                        <th>정서불안</th>
                        <th>애정결핍</th>
                        <th>열등감</th>
                        <th>퇴행</th>
                    </tr>
                </thead>
                <tbody>
                    {pertinentList ? (
                        pertinentList.map((abc) => {
                            return <PrintTableRow array={abc} key={abc.no} />;
                        })
                    ) : (
                        <td>nothing</td>
                    )}
                </tbody>
                <tfoot>
                    {pertinentList ? (
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{first}</td>
                            <td>{second}</td>
                            <td>{third}</td>
                            <td>{fourth}</td>
                            <td>{fifth}</td>
                            <td>{sixth}</td>
                            <td>{seventh}</td>
                            <td>{eighth}</td>
                            <td>{ninth}</td>
                        </tr>
                    ) : (
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
}

Table.defaultProps = {
    house: [0],
};

export default Table;
