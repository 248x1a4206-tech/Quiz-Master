import 'package:flutter/material.dart';

class TimerWidget extends StatelessWidget {
  final int timeLeft;

  const TimerWidget({super.key, required this.timeLeft});

  @override
  Widget build(BuildContext context) {
    Color timerColor = Colors.green;
    if (timeLeft <= 5) {
      timerColor = Colors.red;
    } else if (timeLeft <= 15) {
      timerColor = Colors.amber;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: timerColor.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: timerColor.withOpacity(0.4)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.timer, size: 16, color: timerColor),
          const SizedBox(width: 4),
          Text(
            '\${timeLeft}s',
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.bold,
              color: timerColor,
              fontFamily: 'monospace',
            ),
          ),
        ],
      ),
    );
  }
}
