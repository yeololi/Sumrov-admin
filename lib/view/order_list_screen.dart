import 'package:flutter/material.dart';
import 'package:sumrov_admin/const/font.dart';

class OrderListScreen extends StatefulWidget {
  const OrderListScreen({super.key});

  @override
  State<OrderListScreen> createState() => _OrderListScreenState();
}

class _OrderListScreenState extends State<OrderListScreen> {
  final _cities = ['서울', '대전', '대구', '부산', '인천', '울산', '광주'];
  String _selectedCity = '';

  void initState() {
    super.initState();
    setState(() {
      _selectedCity = _cities[0];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(width: 80),
              Image.asset(
                'asset/img/logo.png',
                width: 45,
                height: 45,
              ),
              const SizedBox(width: 10),
              Text(
                'SUMROV',
                style: cg.copyWith(
                  fontSize: 50,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Container(
              width: MediaQuery.of(context).size.width / 1.1,
              height: MediaQuery.of(context).size.height / 1.25,
              decoration: BoxDecoration(color: Color(0xFFD9D9D9)),
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(width: 100),
                    Text(
                      '주문 UUID: 0037ef66-1955-4453-9ce2-4454d46b61a9',
                      style: ag.copyWith(fontSize: 30),
                    ),
                    Text(
                      '주문 일시',
                      style: ag.copyWith(fontSize: 30),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 50, vertical: 50),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Column(
                            children: [
                              Text(
                                '주문자 이름',
                                style: ag,
                              ),
                              Text(
                                '주소',
                                style: ag,
                              ),
                              Text(
                                '수량',
                                style: ag,
                              ),
                            ],
                          ),
                          const SizedBox(width: 400),
                          Column(
                            children: [
                              Text(
                                '제품 이름',
                                style: ag,
                              ),
                              Text(
                                '총 금액',
                                style: ag,
                              ),
                              Text(
                                '주문자 번호',
                                style: ag,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    DropdownButton(
                      value: _selectedCity,
                      items: _cities
                          .map((e) => DropdownMenuItem(
                        value: e, // 선택 시 onChanged 를 통해 반환할 value
                        child: Text(e),
                      ))
                          .toList(),
                      onChanged: (value) { // items 의 DropdownMenuItem 의 value 반환
                        setState(() {
                          _selectedCity = value!;
                        });
                      },
                    )
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
