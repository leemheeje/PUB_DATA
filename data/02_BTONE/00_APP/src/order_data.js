export default [
    {
        category_name: '주문 목록',
        order_menu: [
            {   title: '건강한 생토마토주스',
                price: 5300,
                options: [],
                count: 2,
                totalPrice: 10600,
                cart_index: 1
            },
            {
                title: '아메리카노',
                price: 5300,
                options: [
                    {
                        label: 'M사이즈 업그레이드',
                        value: 500
                    },
                    {
                        label: '설탕시럽 추가',
                        value: 500
                    },
                    {
                        label: '샷추가',
                        value: 500
                    }
                ],
                count: 2,
                totalPrice: 13600,
                cart_index: 2
            },
            {
                title: '수제 레몬차',
                price: 5300,
                options: [],
                count: 1,
                totalPrice: 5300,
                cart_index: 3
            },
        ]
    }
]