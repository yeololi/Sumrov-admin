import 'package:flutter/material.dart';
import 'package:sumrov_admin/component/text_box.dart';
import 'package:sumrov_admin/const/font.dart';

class AdminScreen extends StatelessWidget {
  const AdminScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          children: [
            Row(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 32),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
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
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text(
                          '회원정보',
                          style: TextStyle(
                            fontSize: 50,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 100),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Column(
                  children: [
                    Row(
                      children: [
                        const SizedBox(width: 30),
                        TextBox(
                          topText: '주문목록',
                          boxText: '주문자',
                          firstButton: '상세보기',
                        ),
                        const SizedBox(width: 130),
                        TextBox(
                          topText: '상품관리',
                          boxText: '상품이름',
                          firstButton: '수정',
                          showPlus: true,
                          plusButton: ElevatedButton(
                            onPressed: () {
                              // 버튼이 클릭되었을 때 수행할 작업
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white, //
                              elevation: 0, // 버튼의 배경색을 흰색으로 지정
                            ),
                            child: Icon(
                              Icons.add, // + 아이콘 사용
                              color: Colors.black, // 아
                              size: 32,// 이콘의 색을 검은색으로 지정
                            ),
                          ),
                          showDelete: true,
                          deleteButton: ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              fixedSize: Size(80, 50),
                              backgroundColor: Color(0xFFD9D9D9),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(0.0),
                              ),
                            ),
                            child: Text(
                              '삭제',
                              style: cg.copyWith(fontSize: 16),
                            ),
                          ),
                        ),
                        const SizedBox(width: 130),
                        TextBox(
                          topText: '공지사항',
                          boxText: '공지제목',
                          firstButton: '수정',
                          showDelete: true,
                          deleteButton: ElevatedButton(
                            onPressed: () {},
                            style: ElevatedButton.styleFrom(
                              fixedSize: Size(80, 50),
                              backgroundColor: Color(0xFFD9D9D9),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(0.0),
                              ),
                            ),
                            child: Text(
                              '삭제',
                              style: cg.copyWith(fontSize: 16),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
