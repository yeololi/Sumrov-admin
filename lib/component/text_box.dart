import 'package:flutter/material.dart';
import 'package:sumrov_admin/const/font.dart';

class TextBox extends StatelessWidget {
  final String topText;
  final String boxText;
  final String firstButton;
  final bool showPlus;
  final bool showDelete;
  final ElevatedButton? plusButton;
  final ElevatedButton? deleteButton;

  const TextBox({
    required this.topText,
    required this.boxText,
    required this.firstButton,
    this.showPlus = false,
    this.showDelete = false,
    this.plusButton,
    this.deleteButton,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              topText,
              style: cg.copyWith(
                fontWeight: FontWeight.w600,
                fontSize: 26,
              ),
            ),
            const SizedBox(width: 240),
            if (showPlus) plusButton!,
          ],
        ),
        const SizedBox(height: 8),
        Container(
          width: MediaQuery.of(context).size.width / 3.8,
          height: MediaQuery.of(context).size.height / 2,
          decoration: BoxDecoration(color: Color(0xFFD9D9D9)),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      width: MediaQuery.of(context).size.width / 4.25,
                      height: MediaQuery.of(context).size.height / 15,
                      decoration: BoxDecoration(color: Colors.white),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Row(
                          children: [
                            Text(
                              boxText,
                              style: cg.copyWith(
                                fontWeight: FontWeight.w600,
                                fontSize: 20,
                              ),
                            ),
                            Expanded(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  ElevatedButton(
                                    onPressed: () {},
                                    style: ElevatedButton.styleFrom(
                                      fixedSize:
                                          Size(!showDelete ? 110 : 80, 80),
                                      backgroundColor: Color(0xFFD9D9D9),
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(0.0),
                                      ),
                                    ),
                                    child: Text(
                                      firstButton,
                                      style: cg.copyWith(fontSize: 16),
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  if (showDelete) deleteButton!,
                                ],
                              ),
                            )
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
